import { useParams } from "react-router-dom";
import {gql, useQuery} from '@apollo/client';
import PressReleaseImage from "./PressReleaseImage";

const GET_PRESSRELEASE = gql`
query GetPressRelease($id: Int!)
  {
    typedComponent(namespaceId:1, publicationId:10, componentId:$id) {
      ... on PressRelease {
        title
        subTitle
        media {
          id
          itemId
          publicationId
        }
        bodyContent {
          html
        }
      }
    }
  }
`;

function PressRelease() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRESSRELEASE, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const item = data.typedComponent;
  return (
      <div className="pressrelease">
          <h2>{item.title}</h2>
          <h4>{item.subTitle}</h4>
          <div dangerouslySetInnerHTML={{__html: item.bodyContent.html}} />
          <PressReleaseImage imageId={"tcm:"+item.media.publicationId+"-"+item.media.itemId}></PressReleaseImage>
      </div>
  );
}

export default PressRelease;
