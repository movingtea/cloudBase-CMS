// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/My-project/cloudbase-cms/packages/admin/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'D:/My-project/cloudbase-cms/packages/admin/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/login",
        "layout": false,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__login' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/login'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/home",
        "layout": false,
        "access": "isLogin",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/settings",
        "layout": false,
        "access": "isAdmin",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/My-project/cloudbase-cms/packages/admin/src/components/SecurityWrapper/index'), loading: LoadingComponent})],
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__system__setting' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/system/setting'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/settings/role/edit",
        "layout": false,
        "access": "isAdmin",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/My-project/cloudbase-cms/packages/admin/src/components/SecurityWrapper/index'), loading: LoadingComponent})],
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__system__setting__RoleEditor__index' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/system/setting/RoleEditor/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/",
        "exact": true,
        "redirect": "/home"
      },
      {
        "path": "/redirect",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__redirect' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/redirect'), loading: LoadingComponent})
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layout__index' */'D:/My-project/cloudbase-cms/packages/admin/src/layout/index'), loading: LoadingComponent}),
        "layout": false,
        "routes": [
          {
            "exact": true,
            "path": "/:projectId/home",
            "name": "Overview1",
            "icon": "eye",
            "access": "isLogin",
            "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/My-project/cloudbase-cms/packages/admin/src/components/SecurityWrapper/index'), loading: LoadingComponent})],
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__overview' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/project/overview'), loading: LoadingComponent})
          },
          {
            "exact": true,
            "path": "/:projectId/schema",
            "name": "内容模型",
            "icon": "gold",
            "access": "canSchema",
            "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/My-project/cloudbase-cms/packages/admin/src/components/SecurityWrapper/index'), loading: LoadingComponent})],
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__schema__index' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/project/schema/index'), loading: LoadingComponent})
          },
          {
            "path": "/:projectId/content",
            "name": "内容集合",
            "icon": "database",
            "access": "canContent",
            "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/My-project/cloudbase-cms/packages/admin/src/components/SecurityWrapper/index'), loading: LoadingComponent})],
            "routes": [
              {
                "exact": true,
                "path": "/:projectId/content/migrate",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__migrate' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/project/migrate'), loading: LoadingComponent})
              },
              {
                "exact": true,
                "path": "/:projectId/content/:schemaId",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__content__index' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/project/content/index'), loading: LoadingComponent})
              },
              {
                "exact": true,
                "path": "/:projectId/content/:schemaId/edit",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__content__ContentEditor' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/project/content/ContentEditor'), loading: LoadingComponent})
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__content__index' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/project/content/index'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "exact": true,
            "path": "/:projectId/webhook",
            "name": "Webhook",
            "icon": "deployment-unit",
            "access": "canWebhook",
            "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/My-project/cloudbase-cms/packages/admin/src/components/SecurityWrapper/index'), loading: LoadingComponent})],
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__webhook__index' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/project/webhook/index'), loading: LoadingComponent})
          },
          {
            "exact": true,
            "path": "/:projectId/setting",
            "name": "项目设置",
            "icon": "setting",
            "access": "isAdmin",
            "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/My-project/cloudbase-cms/packages/admin/src/components/SecurityWrapper/index'), loading: LoadingComponent})],
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__setting__index' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/project/setting/index'), loading: LoadingComponent})
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/My-project/cloudbase-cms/packages/admin/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
