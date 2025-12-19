
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { BentoBlock } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Globe, Lock, Users, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

const visibilityConfig = {
  public: { icon: Globe, label: "Public", color: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30" },
  'friends-only': { icon: Users, label: "Friends-Only", color: "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30" },
  private: { icon: Lock, label: "Private", color: "bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30" },
};

export const columns: ColumnDef<BentoBlock>[] = [
    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
        enableSorting: false,
        enableHiding: false,
  },
  {
    accessorKey: "content.title",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const title: string = row.getValue("content_title")
        const url: string = row.original.content.url;
        return (
            <div className="pl-4">
                <div className="font-medium">{title}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[250px]">{url}</div>
            </div>
        )
    }
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => {
        const visibility = row.getValue("visibility") as keyof typeof visibilityConfig;
        const config = visibilityConfig[visibility];
        const Icon = config.icon;
        
        return (
            <Badge variant="outline" className={`flex items-center gap-1.5 w-fit ${config.color}`}>
                <Icon className="h-3 w-3" />
                <span>{config.label}</span>
            </Badge>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const link = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(link.content.url)}
            >
              Copy link URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
