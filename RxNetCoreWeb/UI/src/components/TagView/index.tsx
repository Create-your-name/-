import React, { useState, useEffect, useRef } from 'react';
import { RouteContext } from '@ant-design/pro-layout';
import type { RouteContextType } from '@ant-design/pro-layout';
import { history } from 'umi';
import Tags from './Tags';
import styles from './index.less';
import { Location } from 'history';

export type TagsItemType = {
  title?: string;
  path?: string;
  search?: string;
  active: boolean;
  query?: any;
  children: any;
  refresh: number;
};

interface IProps {
  home: string;
}

export function historyPush(tag: TagsItemType) {
  history.push({ pathname: tag?.path, query: tag?.query, search: tag?.search });
}

export function tagKey(tag: TagsItemType) {
  return tag.path+(tag.search??"");
}

/**
 * @component TagView 标签页组件
 */
const TagView: React.FC<IProps> = ({ children, home }) => {
  const [tagList, setTagList] = useState<TagsItemType[]>([]);

  const [currentPath, setCurrentPath] = useState<string | undefined>();
  const routeContextRef = useRef<RouteContextType>();

  useEffect(() => {
    if (routeContextRef.current) {
      handleOnChange(routeContextRef.current);
    }
  }, [routeContextRef.current]);

  // 初始化 visitedViews，设置首页
  const initTags = (routeContext: RouteContextType) => {
    const { menuData } = routeContext;
    if (tagList.length === 0 && menuData) {
      const firstTag = menuData.filter((el) => el.path === home)[0];
      const title = firstTag.name;
      const path = firstTag.path;
      history.push({ pathname: firstTag.path, query: firstTag.query});

      setTagList([
        {
          title,
          path,
          children,
          refresh: 0,
          active: true,
        },
      ]);
    }
  };

  // 监听路由改变
  const handleOnChange = (routeContext: RouteContextType) => {
    const { currentMenu } = routeContext;
    const location = (routeContext as any).location;
    const search = location.search;
    const query = location.query;
    console.log(routeContext);
    // tags初始化
    if (tagList.length === 0) {
      return initTags(routeContext);
    }

    // 判断是否已打开过该页面
    let hasOpen = false;
    const tagsCopy: TagsItemType[] = tagList.map((item) => {
      if (currentMenu?.hideInMenu) {
        if (currentMenu?.path === item.path && search == item.search) {
          hasOpen = true;
          // 刷新浏览器时，重新覆盖当前 path 的 children
          return { ...item, active: true, children };
        } else {
          return { ...item, active: false };
        }
      } else {
        if (currentMenu?.path === item.path) {
          hasOpen = true;
          // 刷新浏览器时，重新覆盖当前 path 的 children
          return { ...item, active: true, children };
        } else {
          return { ...item, active: false };
        }
      }
      
    });

    // 没有该tag时追加一个,并打开这个tag页面
    if (!hasOpen) {
      const title = query?.name || routeContext.title || '';
      const path = currentMenu?.path;

      tagsCopy.push({
        title,
        path,
        search,
        query,
        children,
        refresh: 0,
        active: true,
      });
    }

    return setTagList(tagsCopy);
  };

  // 关闭标签
  const handleCloseTag = (tag: TagsItemType) => {
    const tagsCopy: TagsItemType[] = tagList.map((el, i) => ({ ...el }));

    // 判断关闭标签是否处于打开状态
    tagList.forEach((el, i) => {
      if (tagKey(el) === tagKey(tag) && tag.active) {
        const next = tagList[i - 1];
        next.active = true;
        historyPush(next);
      }
    });

    setTagList(tagsCopy.filter((el) => tagKey(el) !== tagKey(tag) ));
  };

  // 关闭所有标签
  const handleCloseAll = () => {
    const tagsCopy: TagsItemType[] = tagList.filter((el) => el.path === home);
    history.push(home);
    setTagList(tagsCopy);
  };

  // 关闭其他标签
  const handleCloseOther = (tag: TagsItemType) => {
    const tagsCopy: TagsItemType[] = tagList.filter(
      (el) => el.path === home || el.path === tag.path,
    );
    historyPush(tag);
    setTagList(tagsCopy);
  };

  // 刷新选择的标签
  const handleRefreshTag = (tag: TagsItemType) => {
    const tagsCopy: TagsItemType[] = tagList.map((item) => {
      if (tagKey(item) === tagKey(tag) ) {
        historyPush(tag);
        return { ...item, refresh: item.refresh + 1, active: true };
      }
      return { ...item, active: false };
    });
    setTagList(tagsCopy);
  };

  return (
    <>
      <RouteContext.Consumer>
        {(value: RouteContextType) => {
          setTimeout(() => {
            setCurrentPath(value.currentMenu?.path + (value as any).location.search);
          }, 0);
          routeContextRef.current = value;
          return null;
        }}
      </RouteContext.Consumer>
      <div className={styles.tag_view}>
        <div className={styles.tags_container}>
          <Tags
            tagList={tagList}
            closeTag={handleCloseTag}
            closeAllTag={handleCloseAll}
            closeOtherTag={handleCloseOther}
            refreshTag={handleRefreshTag}
          />
        </div>
      </div>

      {tagList.map((item) => {
        return (
          <div key={tagKey(item)} style={{ display: item.active ? 'block' : 'none' }}>
            <div key={item.refresh}>{item.children}</div>
          </div>
        );
      })}
    </>
  );
};

export default TagView;
