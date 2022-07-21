import {ApolloClient, InMemoryCache} from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PressReleaseList from './PressReleaseList';
import PressRelease from "./PressRelease";

const client = new ApolloClient({
    uri: "http://localhost:8081/cd/api/",
    cache: new InMemoryCache()
});

const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <Routes>
                <Route path="/pressrelease/:id" element={<PressRelease/>} />
                <Route path="/" element={<PressReleaseList/>} />
            </Routes>
        </Router>
    </ApolloProvider>
);

export default App;
