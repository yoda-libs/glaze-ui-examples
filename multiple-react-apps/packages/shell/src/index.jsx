/** @jsx createElement */
import { 
    bootstrap, 
    createApps, app, blankApp,
    createRoutes, route, defaultRoute,
    createLayout, createElement
} from 'glaze-ui';

// urls injected by webpack
const apps = createApps([
    app('navbar', NAVBAR_URL),
    app('todo', TODO_URL),
    app('footer', FOOTER_URL),
    app('login', LOGIN_URL),
]);



const mainLayout = (template, contentApp) => createLayout(
    <div className='layout'>
        <div id="navbar" />
        <div className="content-outer">
            <div id="content">
                {template}
            </div>
        </div>
        <div id="footer" />
    </div>
, {
    navbar: apps['navbar'],
    content: contentApp,
    footer: apps['footer'],
});

const loginLayout = createLayout(
    <div className='outer'>
        <div className="outer">
            <div className="inner">
                <div id="login" />
            </div>
        </div>
    </div>,
    {
        login: apps['login']
    }
);

const notFoundTemplate = (
    <div className='outer'>
        <div className="outer">
            <div className="inner">
                <h1>404 Page Not Found</h1>
            </div>
        </div>
    </div>
);

const authMiddleware = async (ctx, next) => {
    if (ctx.path.startsWith('/login')) return next();

    if (ctx.path.startsWith('/logout')) {
        localStorage.removeItem('token');
        return await router.navigate('/login');
    }

    if (ctx.path.startsWith('/auth')) {
        const { token } = ctx.state;

        localStorage.setItem('token', token);
        return await router.navigate('/');
    }

    if (!localStorage.getItem('token')) return await router.navigate('/login');

    next();
  };

const router = createRoutes([
    authMiddleware,
    route('/', mainLayout('', apps['todo'])),
    route('/login', loginLayout),
    defaultRoute(
        mainLayout(notFoundTemplate, blankApp)
    )
])


bootstrap({
    container: document.getElementById('root'),
    apps,
    router,
    sharedLibs: {
        'react': 'https://unpkg.com/react@17.0.2/umd/react.development.js',
        'react-dom': 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js',
    },
    options: { 
        debug: true,
        baseUrl: '/glaze-ui-examples',
    }
}).then(async glaze => {
    // example on how to send a message to a glaze app
    glaze.dispatch({test: "message"});
}).catch(console.error);