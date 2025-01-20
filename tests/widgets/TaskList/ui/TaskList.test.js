import renderer from 'react-test-renderer';
import {TaskList} from "widgets/TaskList/ui/TaskList.tsx";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

it('все компоненты на месте', () => {
   Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
         matches: false,
         media: query,
         onchange: null,
         addListener: jest.fn(), // Deprecated
         removeListener: jest.fn(), // Deprecated
         addEventListener: jest.fn(),
         removeEventListener: jest.fn(),
         dispatchEvent: jest.fn(),
      })),
   });

   const component = renderer.create(
       <TaskList/>
   );
   let tree = component.toJSON();
   expect(tree).toMatchSnapshot();
});

it('задачи добавляются', () => {
   render(<TaskList />);

   const inputElement = screen.getByPlaceholderText('What needs to be done?');
   const addButton = screen.getByText('Add');

   fireEvent.change(inputElement, { target: { value: 'Новая задача' } });
   fireEvent.click(addButton);

   const taskElement = screen.getByText('Новая задача');
   expect(taskElement).toBeInTheDocument();
});

it('фильтры применяются', () => {
   render(<TaskList />);

   const inputElement = screen.getByPlaceholderText('What needs to be done?');
   const addButton = screen.getByText('Add');
   const completedBtn = screen.getByText('Completed');
   const activeBtn = screen.getByText('Active');

   fireEvent.change(inputElement, { target: { value: 'Сделать тестовое задание' } });
   fireEvent.click(addButton);

   let taskElement = screen.getByText('Сделать тестовое задание');
   expect(taskElement).toBeInTheDocument();

   fireEvent.click(completedBtn);
   expect(() => screen.getByText('Сделать тестовое задание')).toThrow();

   fireEvent.click(activeBtn);
   taskElement = screen.getByText('Сделать тестовое задание');
   expect(taskElement).toBeInTheDocument();
});

it('статус задачи меняется при нажатии на галочку', () => {
   render(<TaskList />);
   const inputElement = screen.getByPlaceholderText('What needs to be done?');
   const addButton = screen.getByText('Add');
   const activeBtn = screen.getByText('Active');
   const completedBtn = screen.getByText('Completed');

   fireEvent.click(activeBtn);

   fireEvent.change(inputElement, { target: { value: 'Записаться на бадминтон' } });
   fireEvent.click(addButton);

   let taskElement = screen.getByText('Записаться на бадминтон');
   expect(taskElement).toBeInTheDocument();
   fireEvent.click(taskElement);

   expect(() => screen.getByText('Записаться на бадминтон')).toThrow();

   fireEvent.click(completedBtn);
   taskElement = screen.getByText('Записаться на бадминтон');
   expect(taskElement).toBeInTheDocument();
});


