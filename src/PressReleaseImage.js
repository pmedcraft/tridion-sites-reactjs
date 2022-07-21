import {gql, useQuery} from '@apollo/client';

const GET_IMAGE = gql`
query GetPressReleaseImage($id: Int!)
  {
    binaryComponent(namespaceId: 1, publicationId: 10, binaryId: $id) {
      title
      multiMedia
      schemaId
      variants {
        edges {
          node {
            binaryId
            description
            downloadUrl
            path
            type
            url
            variantId
          }
        }
      }
    }
  }
`;

function PressReleaseImage(props) {
  let { imageId } = props;
  var r = /tcm:\d+-(?<itemId>\d+)/;
  var t = r.exec(imageId);
  console.log(t);
  imageId = t.groups.itemId;

  const { loading, error, data } = useQuery(GET_IMAGE, {
    variables: { id: imageId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const imageUrl = data.binaryComponent.variants.edges[0].node.downloadUrl;
  return <img width={600} height={300} src={imageUrl} alt="" />;
}

export default PressReleaseImage;
