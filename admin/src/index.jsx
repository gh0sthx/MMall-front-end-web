/*
* @Author: Rosen
* @Date:   2017-02-09 12:19:54
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-09 22:44:21
*/

'use strict';
// react
import React from 'react';
// react-dom
import { render } from 'react-dom';
// react-router
import { Router, Route, IndexRedirect, Link, hashHistory } from 'react-router';
// bootstrap
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js';
// bootstrap sb-admin-2 主题
import 'node_modules/sb-admin-2/dist/css/sb-admin-2.min.css';
// font-awesome 字体
import 'node_modules/font-awesome/css/font-awesome.min.css';

// 页面
import Layout               from 'page/layout/index.jsx';
import Home                 from 'page/home/index.jsx';
import ProductList          from 'page/product/index/index.jsx';
import ProductSave          from 'page/product/index/save.jsx';
import ProductDetail        from 'page/product/index/detail.jsx';
import ProductCategory      from 'page/product/category/index.jsx';
import ProductCategoryAdd   from 'page/product/category/add.jsx';
import OrderList            from 'page/order/index.jsx';
import OrderDetail          from 'page/order/detail.jsx';
import User                 from 'page/user/index.jsx';
import Login                from 'page/login/index.jsx';
import ErrorPage            from 'page/error/index.jsx';
import BlankPage            from 'page/blank/index.jsx';

// render router
render(
    <Router history={hashHistory}>
        <Route path="/">
            {/* home */} 
            <IndexRedirect to="home" />
            <Route path="home" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={Home}/>
            </Route>
            {/* product */} 
            <Route path="product" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={ProductList}/>
                <Route path="save(/:pId)" component={ProductSave}/>
                <Route path="detail/:pId" component={ProductDetail}/>
            </Route>
            <Route path="product.category" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index(/:categoryId)" component={ProductCategory}/>
                <Route path="add" component={ProductCategoryAdd}/>
            </Route>
            {/* order */} 
            <Route path="order" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={OrderList}/>
                <Route path="detail/:orderNumber" component={OrderDetail}/>
            </Route>
            {/* user */} 
            <Route path="user" component={User}/>
            {/* without layout */} 
            <Route path="login" component={Login}/>
            <Route path="blank" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={BlankPage}/>
            </Route>
            <Route path="*" component={ErrorPage}/>
        </Route>
        
    </Router>, 
    document.getElementById('app')
);
