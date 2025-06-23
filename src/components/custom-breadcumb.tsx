"use client";

import React from "react";
import { useBreadcrumbs } from "@/hooks/use-breadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Fragment } from "react";
import { Slash } from "lucide-react";

export function CustomBreadcumb() {
  const breadCrumb = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumb.map((item, index) => (
          <Fragment key={item.title}>
            {index !== breadCrumb.length - 1 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < breadCrumb.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block">
                <Slash />
              </BreadcrumbSeparator>
            )}
            {index === breadCrumb.length - 1 && (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
