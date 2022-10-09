import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { CredentialNFT } from './Answer';

export interface CredentialListProps extends React.HTMLProps<HTMLInputElement> {
  className?: string;
  credentials: CredentialNFT[];
}

const CredentialList = ({className, credentials}: CredentialListProps) => {
  
  return (
    <>
      <ImageList className={className}>
      {credentials.map((item) => (
        <ImageListItem key={item.imageUrl}>
          <img
            src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
            srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={<span>{item.description}</span>}
            position="below"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={item.description}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.name}`}
              >
              <InfoIcon onClick={() => window.open(`https://testnets.opensea.io/assets/mumbai/${item.contractAddress}/${item.tokenId}`, '_blank', 'noopener,noreferrer')}/>
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </>
  );
};

export default CredentialList;
