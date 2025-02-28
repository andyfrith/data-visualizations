"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Nav() {
  return (
    <NavigationMenu className="m-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Visualizations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-6">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Data Visualizations
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      By combining appropriate libraries and techniques,
                      developers can create performant and user-friendly
                      visualizations of large datasets in React applications.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/d3/explore-react-graph-gallery/climate-crisis"
                title="Climate Crisis"
              >
                ...
              </ListItem>
              <ListItem
                href="/d3/explore-react-viz/scatterplots/example-1"
                title="The value of a good movie"
              >
                Scatterplot visualization of movie budgets, ratings and revenues
              </ListItem>
              <ListItem
                href="/d3/explore-react-viz/scatterplots/example-2"
                title="The value of a good movie (hover version)"
              >
                Scatterplot visualization of movie budgets, ratings and revenues
                with hover tooltip
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>D3</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-6">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">D3</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      By combining appropriate libraries and techniques,
                      developers can create performant and user-friendly
                      visualizations of large datasets in React applications.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/d3/explore-react-graph-gallery/axis"
                title="Axis"
              >
                ....
              </ListItem>
              <ListItem
                href="/d3/explore-react-graph-gallery/bar-chart"
                title="Bar Chart"
              >
                ....
              </ListItem>
              <ListItem
                href="/d3/explore-react-graph-gallery/climate-crisis"
                title="Climate Crisis"
              >
                ...
              </ListItem>
              <ListItem
                href="/d3/explore-react-graph-gallery/scatterplot"
                title="Scatterplot"
              >
                ...
              </ListItem>
              <ListItem
                href="/d3/explore-react-viz/scatterplots/example-1"
                title="Scatterplot - The value of a good movie"
              >
                Scatterplot visualization of movie budgets, ratings and revenues
              </ListItem>
              <ListItem
                href="/d3/explore-react-viz/scatterplots/example-2"
                title="The value of a good movie (hover version)"
              >
                Scatterplot visualization of movie budgets, ratings and revenues
                with hover tooltip
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recharts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-6">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Recharts
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Recharts is a composable charting library built on React
                      components. Beautiful charts (Shadcn UI) are built using
                      Recharts, styled and wrapped wth Shadcn components.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/recharts/area-chart-interactive"
                title="Area Chart Interactive"
              >
                A beautiful chart (Shadcn UI) built using Recharts, styled and
                wrapped wth Shadcn components.
              </ListItem>
              <ListItem
                href="/recharts/area-chart-stacked"
                title="Area Chart Stacked"
              >
                A beautiful chart (Shadcn UI) built using Recharts, styled and
                wrapped wth Shadcn components.
              </ListItem>
              <ListItem
                href="/recharts/bar-chart-interactive"
                title="Bar Chart Interactive"
              >
                A beautiful chart (Shadcn UI) built using Recharts, styled and
                wrapped wth Shadcn components.
              </ListItem>
              <ListItem
                href="/recharts/line-chart-custom-label"
                title="Line Chart Custom Label"
              >
                A beautiful chart (Shadcn UI) built using Recharts, styled and
                wrapped wth Shadcn components.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
