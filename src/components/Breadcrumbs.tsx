'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link
          href="/"
          className="flex items-center gap-1 text-slate-600 hover:text-teal-800 transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-gold-600" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            {item.path ? (
              <Link
                href={item.path}
                className="hover:text-teal-800 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ) : (
              <span className="font-bold text-teal-900 truncate">{item.name}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
