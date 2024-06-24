import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Wrapper,
  TopMenu,
  Menu,
  BodyWrapper,
  MenuNav,
  NavsWrapper,
  Header,
  CompanyName,
  ComposedDropDown,
  ComposedWrapper,
  DropdownItem,
} from './styled';
import { routes } from '../../../routes';
import { useLocation, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useAppInfo, useSettings } from '../../../http/query-hooks';
import { UserInfo } from './UserInfo';
import { isAuth } from '../../../http/service';
import { ViewModuleSharp } from '@material-ui/icons';
import { MarginWrapper } from '../../../theme/wrappers';
import { AnimateWrapper } from '../../animate-wrapper';
import { useClickOutside } from '../../../shared/hooks/use-outside-click';

interface Props {
  title: string;
  isNavsHidden?: boolean;
  headerRightContent?: React.ReactNode;
}

interface NavProps {
  to?: string;
  isSub?: boolean;
}

const Nav: React.FC<NavProps> = ({ to, children, isSub }) => {
  const location = useLocation();
  const history = useHistory();
  const onClickMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    history.push(e.currentTarget.getAttribute('href')!);
  };

  const isActive = location.pathname === to && !isSub;

  return (
    <MenuNav href={to} onClick={onClickMenu} isActive={isActive}>
      {children}
    </MenuNav>
  );
};

interface ComposedProps {
  label: React.ReactNode;
  navs: {
    element: React.ReactNode;
  }[];
}

const OpenableMenuItem: React.FC<ComposedProps> = ({ label, navs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref: any = useClickOutside(() => setIsOpen(false));
  const handleClick = () => {
    setIsOpen(f => !f);
  };
  return (
    <ComposedWrapper onClick={handleClick} isActive={false}>
      {label}
      {isOpen && (
        <ComposedDropDown ref={ref}>
          <AnimateWrapper className="fade">
            {navs.map(({ element }, index) => (
              <div key={index}>{element}</div>
            ))}
          </AnimateWrapper>
        </ComposedDropDown>
      )}
    </ComposedWrapper>
  );
};

export const PageLayout: React.FC<Props> = ({ children, title, headerRightContent, isNavsHidden }) => {
  const { data } = useAppInfo();
  const { data: settings } = useSettings();
  return (
    <>
      <Helmet>
        <title>
          {data?.companyName || ''} - {title}
        </title>
      </Helmet>
      <Wrapper>
        <TopMenu>
          <Menu>
            <NavsWrapper>
              {data?.companyName && <CompanyName>{data.companyName}</CompanyName>}
              {!isNavsHidden && (
                <>
                  <Nav to={routes.home}>Страницы</Nav>
                  <Nav to={routes.components}>Компоненты</Nav>
                  <Nav to={routes.menu}>Меню</Nav>
                  <Nav to={routes.settings}>Настройки</Nav>
                  {settings?.cruds && (
                    <OpenableMenuItem
                      label={
                        <>
                          <ViewModuleSharp fontSize="small" />
                          <MarginWrapper marginLeft="s">Модули</MarginWrapper>
                        </>
                      }
                      navs={settings.cruds.map(crud => {
                        return {
                          element: (
                            <DropdownItem>
                              <Nav isSub={true} key={crud.name} to={routes.crudList.replace(':name', crud.name)}>
                                <MarginWrapper>{crud.label}</MarginWrapper>
                              </Nav>
                            </DropdownItem>
                          ),
                        };
                      })}
                    />
                  )}
                </>
              )}
              {isAuth() && <UserInfo />}
            </NavsWrapper>
          </Menu>
        </TopMenu>
        <BodyWrapper>
          <Header>
            <AnimateWrapper className="fade">
              <Typography
                variant="h3"
                style={{
                  fontWeight: 600,
                  opacity: 1.4,
                  fontSize: '40px',
                  color: '#cccccc',
                  letterSpacing: '-1px',
                }}
              >
                {title}
              </Typography>
            </AnimateWrapper>
            {headerRightContent}
          </Header>
          <br />
          {children}
        </BodyWrapper>
      </Wrapper>
    </>
  );
};
