import * as React from 'react';
import * as ReactDOM from 'react-dom';

if(location.pathname == "/helloworld1"){
    require('./css/main.css');
}

export default class App extends React.Component<any,any>{
    render(){
        return(
            <div id="container">
                <h1>Welcome to Hello World 1</h1>
                <a href="helloworld1">Hello World 1</a>
                <a href="helloworld2">Hello World 2</a>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nisi reprehenderit excepturi asperiores inventore eaque nobis ratione esse consequuntur dolorem temporibus amet assumenda praesentium accusantium iste, incidunt qui sunt minima voluptate pariatur. Obcaecati dolore nesciunt in repellendus. Repellat quibusdam esse perferendis consectetur nihil asperiores quo culpa, rerum facere. Eius itaque voluptatem distinctio necessitatibus nulla, exercitationem voluptates minima eaque quisquam earum at nemo unde aliquid quaerat minus? Eaque repellat suscipit excepturi nam, quam ratione asperiores reprehenderit explicabo officiis magnam, veritatis, architecto delectus ullam? Provident odio magni impedit, explicabo at dolorem ad voluptates totam sapiente quaerat temporibus modi labore debitis ut quia.</p>
            </div>
        );
    }
}