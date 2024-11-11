"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@rafty/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "./Navigation";

type PageLink = {
  label: string;
  page: { href: string; title: string };
  previous?: boolean;
};

function PageLink({ label, page, previous = false }: PageLink) {
  return (
    <>
      <Link href={page.href}>
        <Button
          className="bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:border-secondary-700 dark:hover:bg-secondary-700/70 rounded-full py-1"
          aria-label={`${label}: ${page.title}`}
          variant="solid"
          leftIcon={
            previous ? (
              <ArrowLeftIcon width={16} height={16} className="stroke-2" />
            ) : undefined
          }
          rightIcon={
            !previous ? (
              <ArrowRightIcon width={16} height={16} className="stroke-2" />
            ) : undefined
          }
        >
          {label}
        </Button>
      </Link>
      <Link
        href={page.href}
        tabIndex={-1}
        aria-hidden="true"
        className="text-secondary-900 hover:text-secondary-600 dark:hover:text-secondary-300 text-[1rem] font-semibold leading-[1.75rem] transition dark:text-white"
      >
        {page.title}
      </Link>
    </>
  );
}

function PageNavigation() {
  const pathname = usePathname();
  const allPages = NAVIGATION.flatMap(({ links }) => links);
  const currentPageIndex = allPages.findIndex(({ href }) => href === pathname);

  if (currentPageIndex === -1) {
    return null;
  }

  const previousPage = allPages[currentPageIndex - 1];
  const nextPage = allPages[currentPageIndex + 1];

  if (!previousPage && !nextPage) {
    return null;
  }

  return (
    <div className="flex">
      {previousPage && (
        <div className="flex flex-col items-start gap-3">
          <PageLink label="Previous" page={previousPage} previous />
        </div>
      )}
      {nextPage && (
        <div className="ml-auto flex flex-col items-end gap-3">
          <PageLink label="Next" page={nextPage} />
        </div>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
      <PageNavigation />
      <p className="text-secondary-600 text-center dark:text-secondary-400 text-[0.8125rem] leading-[1.5rem]">
        &copy; {new Date().getFullYear()} rhinobase, Inc. All rights reserved.
      </p>
    </footer>
  );
}
