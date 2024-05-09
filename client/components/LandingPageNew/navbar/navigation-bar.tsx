'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

import Logo from './logo';

const components: { title: string; description: string }[] = [
  {
    title: 'UML Generation',

    description:
      'Automate your UML generation process of any java/python project',
  },
  {
    title: 'Testing Plans',

    description: 'Generate testing plans',
  },
  {
    title: 'Dependency checker',

    description:
      'Analyizes your codebase and remove any reduntant/extra dependencies',
  },
  {
    title: 'README',

    description: 'Generate Readme and customize it accordingly',
  },
  {
    title: 'Code coverage',

    description:
      'Generate reports to visualize code coverage and identify areas that require additional testing.',
  },
];

export function NavigationMenuBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className='hidden md:flex md:space-x-4'>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <a
                    className='from-muted/50 to-muted flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md'
                    href='/'
                  >
                    <Logo />
                    <div className='mb-2 mt-4 text-lg font-medium'>Docify</div>
                    <p className='text-muted-foreground text-sm leading-tight'>
                      Software to help streamline project documentation
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem title='Github'>Connect your github account</ListItem>
              <ListItem title='Import'>
                Import any of the python/java repositories
              </ListItem>
              <ListItem title='Automate'>
                Create UML diagrams,test plans and README.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
              {components.map((component) => (
                <ListItem key={component.title} title={component.title}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink className='mr-2 text-sm font-medium'>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="
              font-medium">
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
