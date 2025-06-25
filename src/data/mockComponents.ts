
import { Component } from '@/types/component';
import { SampleButton, SampleCard, SampleInput } from '@/components/sample/SampleComponents';
import { LoginPage } from '@/components/auth/LoginPage';
import { RegisterPage } from '@/components/auth/RegisterPage';

export const mockComponents: Component[] = [
  {
    id: '1',
    name: 'Button',
    description: 'Reusable button component with variants and states',
    category: 'UI' as const,
    tags: ['button', 'interactive', 'form'],
    version: '1.2.0',
    filePath: 'src/components/ui/Button.tsx',
    code: `import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false
}) => {
  const baseClasses = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};`,
    previewComponent: SampleButton
  },
  {
    id: '2',
    name: 'Card',
    description: 'Flexible card container with header and content areas',
    category: 'UI' as const,
    tags: ['card', 'container', 'layout'],
    version: '1.1.0',
    filePath: 'src/components/ui/Card.tsx',
    code: `import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={\`bg-white border border-gray-200 rounded-lg shadow-sm \${className} \${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}\`}
      onClick={onClick}
    >
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};`,
    previewComponent: SampleCard
  },
  {
    id: '3',
    name: 'Input',
    description: 'Form input with validation and error states',
    category: 'UI' as const,
    tags: ['input', 'form', 'validation'],
    version: '1.0.5',
    filePath: 'src/components/ui/Input.tsx',
    code: `import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  required = false,
  disabled = false
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={\`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 \${
          error ? 'border-red-300' : 'border-gray-300'
        } \${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}\`}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};`,
    previewComponent: SampleInput
  },
  {
    id: '4',
    name: 'useHybridAuth',
    description: 'Custom hook for handling multiple authentication providers',
    category: 'Hooks' as const,
    tags: ['auth', 'hook', 'state-management'],
    version: '2.0.1',
    filePath: 'src/hooks/useHybridAuth.ts',
    code: `import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  provider: 'email' | 'google' | 'github';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UseHybridAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export const useHybridAuth = (): UseHybridAuthReturn => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // TODO: Replace with actual auth service call
        const sessionUser = localStorage.getItem('auth_user');
        if (sessionUser) {
          setState(prev => ({ ...prev, user: JSON.parse(sessionUser), loading: false }));
        } else {
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Session check failed', loading: false }));
      }
    };

    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Replace with actual auth service call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        provider: 'email'
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      setState(prev => ({ ...prev, user: mockUser, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Login failed', loading: false }));
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Implement Google OAuth flow
      throw new Error('Google login not yet implemented');
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Google login failed', loading: false }));
    }
  }, []);

  const loginWithGithub = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Implement GitHub OAuth flow
      throw new Error('GitHub login not yet implemented');
    } catch (error) {
      setState(prev => ({ ...prev, error: 'GitHub login failed', loading: false }));
    }
  }, []);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      // TODO: Replace with actual auth service call
      localStorage.removeItem('auth_user');
      setState({ user: null, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Logout failed', loading: false }));
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Replace with actual auth service call
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        provider: 'email'
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      setState(prev => ({ ...prev, user: mockUser, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Registration failed', loading: false }));
    }
  }, []);

  return {
    ...state,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout,
    register
  };
};`
  },
  {
    id: '5',
    name: 'AuthProvider',
    description: 'Context provider for application-wide authentication state',
    category: 'Providers' as const,
    tags: ['auth', 'context', 'provider'],
    version: '1.3.0',
    filePath: 'src/providers/AuthProvider.tsx',
    code: `import React, { createContext, useContext, ReactNode } from 'react';
import { useHybridAuth } from '../hooks/useHybridAuth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useHybridAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Usage example:
// Wrap your app with <AuthProvider>
// Then use useAuth() in any component to access auth state and methods`
  },
  {
    id: '6',
    name: 'FeatureFlagProvider',
    description: 'Provider for managing feature flags across the application',
    category: 'Providers' as const,
    tags: ['feature-flags', 'context', 'provider'],
    version: '1.1.2',
    filePath: 'src/providers/FeatureFlagProvider.tsx',
    code: `import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface FeatureFlags {
  [key: string]: boolean;
}

interface FeatureFlagContextType {
  flags: FeatureFlags;
  isEnabled: (flag: string) => boolean;
  toggleFlag: (flag: string) => void;
  loading: boolean;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

interface FeatureFlagProviderProps {
  children: ReactNode;
  initialFlags?: FeatureFlags;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ 
  children, 
  initialFlags = {} 
}) => {
  const [flags, setFlags] = useState<FeatureFlags>(initialFlags);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual feature flag service call
    const loadFeatureFlags = async () => {
      try {
        // Mock API call
        const mockFlags: FeatureFlags = {
          newDashboard: true,
          betaFeatures: false,
          advancedSearch: true,
          darkMode: true,
          ...initialFlags
        };
        
        setFlags(mockFlags);
      } catch (error) {
        console.error('Failed to load feature flags:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatureFlags();
  }, [initialFlags]);

  const isEnabled = (flag: string): boolean => {
    return Boolean(flags[flag]);
  };

  const toggleFlag = (flag: string): void => {
    setFlags(prev => ({
      ...prev,
      [flag]: !prev[flag]
    }));
  };

  const contextValue: FeatureFlagContextType = {
    flags,
    isEnabled,
    toggleFlag,
    loading
  };

  return (
    <FeatureFlagContext.Provider value={contextValue}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};

// Usage example:
// const { isEnabled } = useFeatureFlags();
// if (isEnabled('newDashboard')) {
//   return <NewDashboard />;
// }`
  },
  {
    id: '7',
    name: 'Authentication Pages',
    description: 'Complete authentication flow with login and register pages',
    category: 'Pages' as const,
    tags: ['auth', 'pages', 'forms'],
    version: '1.0.0',
    filePath: 'src/pages/auth/',
    code: `// See individual page components for complete implementation`,
    subPages: [
      {
        name: 'Login Page',
        filePath: 'src/pages/auth/LoginPage.tsx',
        code: `import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // TODO: Replace with actual auth service call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login attempt:', { email, password });
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Sign In
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};`,
        previewComponent: LoginPage
      },
      {
        name: 'Register Page',
        filePath: 'src/pages/auth/RegisterPage.tsx',
        code: `import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      // TODO: Replace with actual auth service call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Register attempt:', { name, email, password });
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Create Account
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};`,
        previewComponent: RegisterPage
      }
    ]
  }
];
