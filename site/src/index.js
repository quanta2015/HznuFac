import React, { lazy, Suspense } from 'react';
import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { ConfigProvider } from 'antd'
import Loadable from '@/component/Loadable'
import zhCN from 'antd/es/locale/zh_CN'
import injects from '@/store'

import '@/less/var.less'
import '@/less/com.less'


configure({ enforceActions: 'observed' })


const Run = lazy(() => import('./app/run'));
const Layout = lazy(() => import('./app/layout'));
const History = lazy(() => import('./app/history'));
const Warn = lazy(() => import('./app/warn'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider {...injects}>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            
            <Route element={<Layout />}>
              <Route path="/" element={<Run />} />
              <Route path="/history" element={<History />} />
              <Route path="/warn" element={<Warn />} />

            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </ConfigProvider>
  </Provider>
);