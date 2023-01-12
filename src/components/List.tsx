import { useState } from "react";

type ListProps = {
  initialItems: string[];
}

export function List({ initialItems }: ListProps) {
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState(initialItems)

  function addList() {
    setTimeout(() => {
      setList(state => [...state, newItem]);
    }, 500)
  }

  function removeFromList(item: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== item));
    }, 500)
  }

  return (
    <>
      <input placeholder="Novo item" value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button onClick={addList}>Adicionar</button>
      <ul>
        {list.map(item => <li key={item}>
          {item}
          <button onClick={() => removeFromList(item)}>Remover</button>
        </li>)}
      </ul>
    </>
  )
}