export type TreeLike<N> = { id: string; children?: N[] };

export type TreeRow<N> = {
  node: N;
  level: number;
  setSize: number;
  posInSet: number;
  parentId?: string;
  // Undefined for a leaf.
  expanded?: boolean;
};

// The visible nodes in reading order: children appear only under expanded parents.
export function flattenTree<N extends TreeLike<N>>(nodes: N[], expanded: ReadonlySet<string>, level = 1, parentId?: string): TreeRow<N>[] {
  return nodes.flatMap((node, i) => {
    const isParent = !!node.children?.length;
    const open = isParent && expanded.has(node.id);
    const row: TreeRow<N> = {
      node,
      level,
      setSize: nodes.length,
      posInSet: i + 1,
      parentId,
      expanded: isParent ? open : undefined,
    };
    return open ? [row, ...flattenTree(node.children!, expanded, level + 1, node.id)] : [row];
  });
}

// APG type-ahead: the next index after `from`, wrapping, whose text starts with `char`. -1 when none matches.
export function findByFirstChar(texts: string[], from: number, char: string): number {
  const c = char.toLocaleLowerCase();
  for (let i = 1; i <= texts.length; i++) {
    const j = (from + i) % texts.length;
    if (texts[j].trim().toLocaleLowerCase().startsWith(c)) return j;
  }
  return -1;
}
