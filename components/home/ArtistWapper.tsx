import { Artist } from "@/types";
import Wrapper from "../shared/Wrapper";
import ArtistItem from "../shared/ArtistItem";
interface ArtistsWrapperProps {
  artists: Artist[];
}
const ArtistsWrapper: React.FC<ArtistsWrapperProps> = ({ artists }) => {
  return (
    <Wrapper>
      {artists.map((artist: Artist) => (
        <ArtistItem key={artist.id} data={artist} />
      ))}
    </Wrapper>
  );
};

export default ArtistsWrapper;
