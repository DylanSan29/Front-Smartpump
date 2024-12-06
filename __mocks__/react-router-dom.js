const mockNavigate = jest.fn();

module.exports = {
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
  useNavigate: () => mockNavigate,
};
