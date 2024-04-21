import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import {Home} from "./pages/home";
import {CategoryPage} from "./pages/category-page";
import {PostPage} from "./pages/post-page";
import React from "react";
import {SingleArticlePage} from "./pages/single-article-page";
import {Playground} from "./pages/playground";
import {User} from "./pages/user";
import {ErrorPage} from "./pages/error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/categories/:category_meta_type/:page_param",
                element: <CategoryPage />,
            },
            {
                path: "/posts/:filter_param/:page_param",
                element: <PostPage />
            },
            {
                path:"/posts/:id",
                element: <SingleArticlePage />
            },
            {
                path: "/playground",
                element: <Playground />
            },
            {
                path: "/users/:user_id/:page_param",
                element: <User />
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ]
    }]
)