import { getAssetNameParts } from '@/common/utils';
import { imageCanonicalUriFromFtMetadata } from '@/common/utils/token-utils';
import { Circle } from '@/ui/components';
import React, { useEffect, useState } from 'react';

import { FtMetadataResponse, NftMetadataResponse } from '@hirosystems/token-metadata-api-client';

export function FtAvatar({
  token,
  tokenMetadata,
}: {
  token: string;
  tokenMetadata?: FtMetadataResponse;
}) {
  const { asset } = getAssetNameParts(token);
  const imageCanonicalUri = imageCanonicalUriFromFtMetadata(tokenMetadata);
  return imageCanonicalUri ? (
    <TokenImage url={imageCanonicalUri} />
  ) : (
    <DefaultTokenImage asset={asset} />
  );
}

export function NftAvatar({
  token,
  tokenMetadata,
}: {
  token: string;
  tokenMetadata?: NftMetadataResponse;
}) {
  const { asset } = getAssetNameParts(token);
  const url = tokenMetadata?.metadata?.cached_image;
  console.log('url', url, tokenMetadata?.metadata?.cached_image);
  const [contentType, setContentType] = useState<string | null>('image');
  useEffect(() => {
    if (!url) return;
    void fetch(url)
      .then(response => {
        setContentType(response.headers.get('content-type'));
      })
      .catch(() => {
        // corrupted image
        setContentType(null);
      });
  }, [url]);
  return url && contentType ? (
    contentType?.startsWith('video') ? (
      <TokenVideo url={url} />
    ) : (
      <TokenImage url={url} />
    )
  ) : (
    <DefaultTokenImage asset={asset} />
  );
}

interface TokenImageProps {
  url: string;
}

const TokenImage = ({ url }: TokenImageProps) => {
  return (
    <img
      width={'36px'}
      height={'36px'}
      src={encodeURI(decodeURI(url))}
      style={{ marginRight: '16px' }}
      alt="token-image"
    />
  );
};

const TokenVideo = ({ url }: TokenImageProps) => {
  return (
    <video width={'36px'} height={'36px'} src={encodeURI(url)} style={{ marginRight: '16px' }} />
  );
};

interface DefaultTokenImageProps {
  asset: string;
}

function DefaultTokenImage({ asset }: DefaultTokenImageProps) {
  return (
    <Circle size="36px" mr="16px">
      {asset[0].toUpperCase()}
    </Circle>
  );
}
