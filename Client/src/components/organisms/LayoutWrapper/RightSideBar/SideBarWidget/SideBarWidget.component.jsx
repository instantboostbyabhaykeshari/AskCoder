'use client';

import React, {Fragment} from 'react';

import { Link } from '../../../../../next/nextRouterAdapter.js';
import { SideBarWidgetData } from "./SideBarWidgetData";


const SideBarWidget = () => {
  return (
    <Fragment>
      <div className="s-sidebarwidget s-sidebarwidget__yellow s-anchors s-anchors__grayscale mb16" data-tracker="cb=1">
        <ul className="d-block p0 m0">
          {SideBarWidgetData.map(({ type, title, icon, link, internal }, index) => {
            if (type === 'header') {
              return <WidgetHeader
                key={index}
                title={title}
              />
            }

            if (type === 'footer') {
              return <WidgetFooter
                key={index}
                title={title}
                link={link}
              />
            }

            return <WidgetItem
              key={index}
              icon={icon}
              title={title}
              link={link}
              internal={internal}
            />
          })}
        </ul>
      </div>
    </Fragment>
  );
};

const WidgetHeader = ({ title }) => (
  <div className="s-sidebarwidget--header s-sidebarwidget__small-bold-text fc-light d:fc-black-900 bb bbw1">
    {title}
  </div>
)

const WidgetItem = ({ icon, title, link, internal }) => (
  <li className="s-sidebarwidget--item d-flex px16">
    <div className="flex--item1 fl-shrink0">
      {icon}
    </div>
    <div className="flex--item wmn0 ow-break-word">
      {internal ? (
        <Link
          to={link}
          className="js-gps-track"
          data-ga={`[&quot;community bulletin board&quot;,&quot;Blog&quot;,&quot;${link}&quot;,null,null]`}
        >
          {title}
        </Link>
      ) : (
        <a
          href={link}
          className="js-gps-track"
          data-ga={`[&quot;community bulletin board&quot;,&quot;Blog&quot;,&quot;${link}&quot;,null,null]`}
          data-gps-track="communitybulletin.click({ priority: 1, position: 0 })"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      )}
    </div>
  </li>
)

const WidgetFooter = ({ title, link }) => (
  <li className="s-sidebarwidget--item s-sidebarwidget--footer px16">
    <Link to={link} className="blog-widget__view-all">
      {title}
    </Link>
  </li>
)

export default SideBarWidget;
