import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

const PasswordField = ({ error, disabled, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          {...props} // contains ref, name, onChange, value, etc.
          type={show ? 'text' : 'password'}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShow((prev) => !prev)}
          disabled={disabled}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default PasswordField;
