import React from 'react';
import styled from 'styled-components/macro';
import { Heart, Share2, MessageSquare, MoreHorizontal } from 'react-feather';
import { useAuth } from '../hooks/useAuth';

const mockData = [
  {
    id: 1,
    title: 'Cool DIY Project 1',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 12,
  },
  {
    id: 2,
    title: 'Cool DIY Project 2',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 100,
  },
  {
    id: 3,
    title: 'Cool DIY Project 3',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 10,
  },
  {
    id: 4,
    title: 'Cool DIY Project 4',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 150,
  },
  {
    id: 5,
    title: 'Cool DIY Project 5',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 66,
  },
  {
    id: 6,
    title: 'Cool DIY Project 6',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 30,
  },
  {
    id: 8,
    title: 'Cool DIY Project 8',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 45,
  },
  {
    id: 9,
    title: 'Cool DIY Project 9',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 110,
  },
  {
    id: 10,
    title: 'Cool DIY Project 10',
    description:
      'Ut veniam adipisicing consectetur ullamco irure proident est ullamco voluptate occaecat aliqua laboris.',
    image: 'https://picsum.photos/800/450',
    likes: 75,
  },
];

const Wrapper = styled.div`
  padding: 2rem;
`;

const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 1rem;
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-rows: minmax(320px, 1fr);
  grid-auto-flow: dense;
  grid-gap: 1rem; */
  margin-top: 2rem;
  @media (min-width: 768px) {
    grid-auto-flow: dense;
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* grid-row-end: span 2; */
  color: white;
  background-image: ${props =>
    `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 320px;
  padding: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  overflow: hidden;
  @media (min-width: 768px) {
    grid-column-end: ${props => (props.likes >= 100 ? 'span 2' : 'inherit')};
    grid-row-end: ${props => (props.likes >= 100 ? 'span 2' : 'inherit')};
  }

  div.user-info {
    display: flex;
    align-items: center;

    img {
      object-fit: cover;
      border-radius: 50px;
      width: 65px;
      height: 65px;
    }

    h4 {
      font-size: 1.25rem;
      margin-left: 2rem;
    }
  }

  div.meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  div.right {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Home = () => {
  const { handleLogout } = useAuth();
  return (
    <Wrapper>
      <h1>Discover</h1>
      {/* <button onClick={handleLogout}>Log out</button> */}
      <GridList>
        {mockData.map(item => (
          <GridItem key={item.id} image={item.image} likes={item.likes}>
            <div className="user-info">
              <div>
                <img src={item.image} />
              </div>
              <h4>John Snow</h4>
            </div>
            <div>
              <h2>{item.title}</h2>
              {/* <p>{item.description}</p> */}
              <div className="meta">
                <div className="left"></div>
                <div className="right">
                  <Heart />
                  <MessageSquare />
                  <Share2 />
                </div>
              </div>
            </div>
          </GridItem>
        ))}
      </GridList>
    </Wrapper>
  );
};

export default Home;
