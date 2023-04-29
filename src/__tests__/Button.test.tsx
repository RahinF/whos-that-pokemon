import Button from '@/components/Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  it('renders', () => {
    render(<Button>test</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders correct child text', () => {
    const buttonText = 'test';
    render(<Button>{buttonText}</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText)
  });
});
