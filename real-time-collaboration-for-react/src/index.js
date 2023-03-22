/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import {
	createBrowserRouter, NavLink,
	RouterProvider
} from 'react-router-dom'
import ErrorPage from './error-page'




const router = createBrowserRouter([
	{
		path: "/ckeditor5-collaboration-samples-fork/real-time-collaboration-for-react/samples/real-time-collaboration-for-react.html",
		element: <App/>,
		errorElement:<ErrorPage />
	},
	{
		path: "/ckeditor5-collaboration-samples-fork/real-time-collaboration-for-react/samples/real-time-collaboration-for-react.html/page2",
		element: (<div>
			<NavLink to={`/ckeditor5-collaboration-samples-fork/real-time-collaboration-for-react/samples/real-time-collaboration-for-react.html`}>page</NavLink>
		</div>),
		errorElement:<ErrorPage />
	},
]);

ReactDOM.render( <React.StrictMode>
	<RouterProvider router={router} />
</React.StrictMode>, document.getElementById( 'root' ) );