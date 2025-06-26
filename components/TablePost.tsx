import React, { Key, useCallback, useMemo, useState } from "react";
import {
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcons,
  PlusIcon,
  SearchIcon,
} from "./icons";
import { Tooltip } from "@heroui/tooltip";
import { PostWithId } from "@/types";
import { useAppSelector } from "@/lib/hooks/store";
import { usePostActions } from "@/lib/hooks/useProductAction";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import ModalViewPost from "./ModalViewPost";
import { useDisclosure } from "@heroui/modal";

interface TablePostProps {
  editPost: (post: PostWithId | null) => void;
}

export const columns = [
  { name: "TITLE", uid: "title", sortable: true },
  { name: "BODY", uid: "body", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["title", "body", "actions"];

export default function TablePost({ editPost }: TablePostProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "title",
    direction: "ascending",
  });
  const posts = useAppSelector((state) => state.post);
  const { removePost } = usePostActions();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...posts];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((post) =>
        post.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [posts, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: PostWithId, b: PostWithId) => {
      const first = a[sortDescriptor.column as keyof PostWithId] as number;
      const second = b[sortDescriptor.column as keyof PostWithId] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const truncateText = (text: string) => {
    const strippedText = text.replace(/<[^>]*>/g, "");
    return strippedText;
  };

  const renderCell = useCallback((post: PostWithId, columnKey: Key) => {
    const cellValue = post[columnKey as keyof PostWithId];

    switch (columnKey) {
      case "body":
        return (
          <div className="max-w-3xl flex items-center gap-2">
            <button
              onClick={() => viewModal(post.body)}
              className="text-lg text-neutral-700 cursor-pointer active:opacity-50 size-4 flex justify-center items-center hover:text-neutral-400"
            >
              <EyeIcons />
            </button>
            <div className="overflow-hidden line-clamp-1 max-w-2xl">
              {truncateText(post.body)}
            </div>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2 ">
            <Tooltip content="Edit user">
              <button
                onClick={() => editPost(post)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <button
                onClick={() => removePost(post.id)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name.toLowerCase()}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<PlusIcon />}
              onPress={() => editPost(null)}
            >
              Add Post
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {posts.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    posts.length,
    hasSearchFilter,
  ]);

  const viewModal = (content: string) => {
    setContent(content);
    onOpen();
  };

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <div className="px-4">
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[700px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalViewPost
        content={content}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
