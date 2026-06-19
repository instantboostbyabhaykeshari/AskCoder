'use client';

import {useEffect} from 'react';
import NextLink from 'next/link';
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

const getHref = (to) => {
  if (!to) return '#';
  if (typeof to === 'string') return to;
  return to.pathname || '#';
};

const isExternalHref = (href) => /^(https?:|mailto:|tel:)/.test(href);

export const Link = ({to, href, children, ...props}) => {
  const nextHref = getHref(to || href);

  if (isExternalHref(nextHref)) {
    return (
      <a href={nextHref} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={nextHref} legacyBehavior>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export const NavLink = ({
  to,
  href,
  exact,
  activeClassName = 'active',
  className = '',
  children,
  ...props
}) => {
  const pathname = usePathname();
  const nextHref = getHref(to || href);
  const currentPath = pathname || '';
  const isActive = exact
    ? currentPath === nextHref
    : currentPath === nextHref || currentPath.startsWith(`${nextHref}/`);
  const activeClass = isActive ? activeClassName : '';

  return (
    <Link
      to={nextHref}
      className={[className, activeClass].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Link>
  );
};

export const Redirect = ({to}) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(getHref(to));
  }, [router, to]);

  return null;
};

export const useHistory = () => {
  const router = useRouter();

  return {
    push: router.push,
    replace: router.replace,
    goBack: router.back,
  };
};

export const useLocation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (typeof window === 'undefined') {
    return {
      pathname: pathname || '',
      search: searchParams?.toString() ? `?${searchParams.toString()}` : '',
      hash: '',
      state: null,
    };
  }

  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: null,
  };
};

export const useParams = () => useNextParams();

export const Switch = ({children}) => <>{children}</>;
export const Route = ({children}) => <>{children}</>;
