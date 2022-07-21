// Import everything needed to use the `useQuery` hook
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PRESSRELEASES = gql`
{
    items(
        filter: {
            publicationIds:[10],
            itemTypes: [COMPONENT],
            schema: {title: "Press Release"}
        },
        sort: {
            sortBy: LAST_PUBLISH_DATE, 
            order:Descending
        },
        first: 12) 
        {
            edges {
                cursor
                node {
                    itemId
                    publicationId
                    itemType
                    ... on PressRelease{
                        title
                        subTitle
                        media {
                            id
                            itemId
                            publicationId
                        },
                        bodyContent {
                            html
                        }
                    }
                }
            }
        }
    }
`;

function DisplayPressReleases() {
  const { loading, error, data } = useQuery(GET_PRESSRELEASES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.items.edges.map((currentPressRelease) => {
      const item = currentPressRelease.node;
      return (
          <div key={item.itemId} id={item.itemId}>
              <h3><a href={"/pressrelease/"+item.itemId}>{item.title}</a></h3>
              <p>{item.subTitle}</p>
          </div>
      )
  });
}

function PressReleaseList() {
  return (
      <div>
        <h2>Press releases</h2>
        <DisplayPressReleases />
      </div>
  );
}

export default PressReleaseList;
