"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  FolderPlus,
  Folder,
  Edit,
  Trash,
  CheckSquare,
  Square,
  GripVertical,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Category = {
  id: number;
  name: string;
  children?: Category[];
};

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    children: [
      { id: 2, name: "Laptops" },
      { id: 3, name: "Phones" },
    ],
  },
  {
    id: 4,
    name: "Furniture",
    children: [
      { id: 5, name: "Office Chairs" },
      { id: 6, name: "Desks" },
    ],
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newName, setNewName] = useState("");
  const [parentId, setParentId] = useState<string>("");

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (id: number) => {
    const newSet = new Set(selected);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelected(newSet);
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setNewName(category.name);
    } else {
      setEditingCategory(null);
      setNewName("");
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!newName.trim()) return;

    if (editingCategory) {
      const update = (cats: Category[]): Category[] =>
        cats.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: newName }
            : { ...c, children: c.children ? update(c.children) : c.children }
        );
      setCategories(update(categories));
    } else {
      const newCat: Category = { id: Date.now(), name: newName };
      if (parentId) {
        const addToParent = (cats: Category[]): Category[] =>
          cats.map((c) =>
            c.id === parseInt(parentId)
              ? { ...c, children: [...(c.children || []), newCat] }
              : { ...c, children: c.children ? addToParent(c.children) : c.children }
          );
        setCategories(addToParent(categories));
      } else {
        setCategories([...categories, newCat]);
      }
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    const remove = (cats: Category[]): Category[] =>
      cats
        .filter((c) => c.id !== id)
        .map((c) => ({ ...c, children: c.children ? remove(c.children) : c.children }));
    setCategories(remove(categories));
  };

  const CategoryTree = ({ cats }: { cats: Category[] }) => (
    <ul className="space-y-1">
      {cats.map((cat) => (
        <li key={cat.id}>
          <div className="flex items-center gap-2 group p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <GripVertical className="w-4 h-4 text-gray-400 opacity-50 cursor-grab" />
            <div onClick={() => toggleSelect(cat.id)}>
              {selected.has(cat.id) ? (
                <CheckSquare className="w-4 h-4 text-blue-500 cursor-pointer" />
              ) : (
                <Square className="w-4 h-4 text-gray-400 cursor-pointer" />
              )}
            </div>
            {cat.children && cat.children.length > 0 ? (
              expanded[cat.id] ? (
                <ChevronDown
                  className="w-4 h-4 text-gray-400 cursor-pointer"
                  onClick={() => toggleExpand(cat.id)}
                />
              ) : (
                <ChevronRight
                  className="w-4 h-4 text-gray-400 cursor-pointer"
                  onClick={() => toggleExpand(cat.id)}
                />
              )
            ) : (
              <Folder className="w-4 h-4 text-gray-400" />
            )}
            <span className="flex-1 font-medium">{cat.name}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Edit
                className="w-4 h-4 text-green-500 cursor-pointer"
                onClick={() => openModal(cat)}
              />
              <Trash
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={() => handleDelete(cat.id)}
              />
            </div>
          </div>
          {cat.children && expanded[cat.id] && (
            <div className="ml-6 border-l pl-4 border-gray-200 dark:border-gray-700">
              <CategoryTree cats={cat.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-sm opacity-80">
            Organize your products into nested categories.
          </p>
        </div>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <Button
              variant="destructive"
              onClick={() => {
                Array.from(selected).forEach((id) => handleDelete(id));
                setSelected(new Set());
              }}
            >
              Delete Selected
            </Button>
          )}
          <Button onClick={() => openModal()}>
            <FolderPlus className="w-4 h-4 mr-2" /> Add Category
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <CategoryTree cats={categories} />
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <Input
              placeholder="Category name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            {!editingCategory && (
              <Select onValueChange={setParentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingCategory ? "Save Changes" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
