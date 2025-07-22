import { Input } from '@/components/atoms/ui/Input'
import { TextArea } from '@/components/atoms/ui/TextArea'

interface FormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'textarea'
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  className?: string
}

export function FormField({ 
  type = 'text', 
  label, 
  name, 
  value, 
  onChange, 
  className 
}: FormFieldProps) {
  if (type === 'textarea') {
    return (
      <TextArea
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
    )
  }

  return (
    <Input
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
    />
  )
}
