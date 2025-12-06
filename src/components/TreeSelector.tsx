import type { TreeStyle } from "../types/defaults";
import { DEFAULT_TREES } from "../types/defaults";
import "../styles/TreeSelector.css";

interface TreeSelectorProps {
  selectedTree: TreeStyle;
  onSelectTree: (tree: TreeStyle) => void;
}

export default function TreeSelector({ selectedTree, onSelectTree }: TreeSelectorProps) {
  return (
    <div className="tree-selector">
      <h3>Select Tree Style</h3>
      <div className="tree-grid">
        {DEFAULT_TREES.map((tree) => (
          <div
            key={tree.id}
            className={`tree-item ${selectedTree.id === tree.id ? "selected" : ""}`}
            onClick={() => onSelectTree(tree)}
            title={tree.name}
          >
            <img src={tree.thumbnail || tree.src} alt={tree.name} />
            <p>{tree.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
