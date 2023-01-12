import { render, waitForElementToBeRemoved, screen } from '@testing-library/react';
import  userEvent  from '@testing-library/user-event';
import { List } from './components/List';

describe('App Component', () => {
  it('should render list items', () => {
    const { getByText, rerender, queryAllByText } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']} />)

    expect(getByText('Diego')).toBeInTheDocument()
    expect(getByText('Rodz')).toBeInTheDocument()
    expect(getByText('Mayk')).toBeInTheDocument()
    
    rerender(<List initialItems={['Carlos']} />)

    expect(screen.getByText('Carlos')).toBeInTheDocument()
    expect(screen.queryAllByText('Mayk')).not.toBeInTheDocument()
  });
  
  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

    const inputElement = getByPlaceholderText('Novo item')
    const addList = getByText('Adicionar');
    
    await userEvent.type(inputElement, 'Novo')
    await userEvent.click(addList);

    expect(await findByText('Novo')).toBeInTheDocument()
  });

  it('should be able to remove new item to the list', async () => {
    const { getByText, getAllByText, queryByText } = render(<List initialItems={['Diego']} />)

    const addList = getByText('Adicionar');
    const removeList = getAllByText('Remover');

    await userEvent.click(removeList[0]);

    await waitForElementToBeRemoved(() => {
      return queryByText('Diego')
    })
  });
});