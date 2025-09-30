# Features Layer Instructions

## Purpose
Features contain reusable business features that provide user value. They represent user actions, interactions, and business capabilities that can be used across different widgets and pages.

## What belongs here:
- User interactions and actions
- Business features with clear user value
- Reusable functionality with business logic
- Components that handle specific user workflows
- Interactive elements with state management

## Structure:
```
src/features/
├── theme-toggle/
│   ├── ui/
│   │   └── ThemeToggle.astro
│   ├── model/
│   │   ├── store.ts
│   │   └── types.ts
│   ├── lib/
│   │   └── theme-utils.ts
│   └── index.ts
├── language-select/
│   ├── ui/
│   │   └── LanguageSelect.astro
│   ├── model/
│   │   └── store.ts
│   └── index.ts
├── contact-form/
│   ├── ui/
│   │   └── ContactForm.astro
│   ├── model/
│   │   ├── validation.ts
│   │   └── types.ts
│   ├── api/
│   │   └── submit.ts
│   └── index.ts
└── project-filter/
    ├── ui/
    │   └── ProjectFilter.astro
    ├── model/
    │   └── filter-store.ts
    └── index.ts
```

## Rules for this layer:
- ✅ Can import from: entities, shared
- ❌ Cannot import from: app, pages, widgets, other features
- ✅ Should provide specific user value
- ❌ Should not be overly complex or contain multiple features

## Feature Examples:

### Theme Toggle Feature
```astro
---
// src/features/theme-toggle/ui/ThemeToggle.astro
import { Button } from '../../../shared/ui';
---

<Button 
  id="theme-toggle"
  variant="ghost" 
  size="sm"
  aria-label="Toggle theme"
>
  <span class="sun-icon">☀️</span>
  <span class="moon-icon">🌙</span>
</Button>

<script>
  // Theme toggle logic
  const button = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  button?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
</script>

<style>
  [data-theme='light'] .moon-icon { display: none; }
  [data-theme='dark'] .sun-icon { display: none; }
</style>
```

### Language Select Feature
```astro
---
// src/features/language-select/ui/LanguageSelect.astro
import { Select } from '../../../shared/ui';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];
---

<div class="language-select">
  <select id="language-select" aria-label="Select language">
    {languages.map(lang => (
      <option value={lang.code}>
        {lang.flag} {lang.name}
      </option>
    ))}
  </select>
</div>

<script>
  const select = document.getElementById('language-select') as HTMLSelectElement;
  
  select?.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement;
    const newLang = target.value;
    
    // Update URL or trigger language change
    window.location.pathname = `/${newLang}${window.location.pathname}`;
  });
</script>
```

### Contact Form Feature
```astro
---
// src/features/contact-form/ui/ContactForm.astro
import { Button, Input, Textarea } from '../../../shared/ui';
import { validateForm } from '../model/validation';
---

<form id="contact-form" class="contact-form">
  <Input 
    name="name" 
    label="Name" 
    required 
    placeholder="Your name"
  />
  
  <Input 
    name="email" 
    type="email" 
    label="Email" 
    required 
    placeholder="your.email@example.com"
  />
  
  <Textarea 
    name="message" 
    label="Message" 
    required 
    placeholder="Your message..."
    rows={5}
  />
  
  <Button type="submit" variant="primary">
    Send Message
  </Button>
</form>

<script>
  import { validateForm } from '../model/validation';
  import { submitForm } from '../api/submit';
  
  const form = document.getElementById('contact-form') as HTMLFormElement;
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    const validation = validateForm(data);
    if (!validation.isValid) {
      // Show validation errors
      return;
    }
    
    // Submit form
    try {
      await submitForm(data);
      // Show success message
    } catch (error) {
      // Show error message
    }
  });
</script>
```

### Form Validation Model
```typescript
// src/features/contact-form/model/validation.ts
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  
  if (!data.message?.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### Public API Export
```typescript
// src/features/theme-toggle/index.ts
export { default as ThemeToggle } from './ui/ThemeToggle.astro';
export type { ThemeType } from './model/types';
```

## Feature Characteristics:
1. **User-focused**: Provides clear value to users
2. **Reusable**: Can be used in multiple widgets/pages
3. **Interactive**: Often involves user actions and state
4. **Self-contained**: Has its own UI, logic, and state
5. **Business-oriented**: Represents business capabilities

## Examples of features for this portfolio:
- **Theme Toggle**: Switch between light/dark modes
- **Language Select**: Change site language
- **Contact Form**: Send messages via contact form
- **Project Filter**: Filter projects by technology/type
- **Scroll to Top**: Navigate to top of page
- **Copy Email**: Copy email address to clipboard
- **Share Project**: Share individual projects
- **Download Resume**: Download CV/Resume file

## Best Practices:
1. Keep features focused on single user actions
2. Make features configurable and reusable
3. Handle all related state within the feature
4. Provide clear error handling and feedback
5. Use proper TypeScript interfaces
6. Include proper accessibility features
7. Test features across different browsers
8. Document feature APIs clearly

## What should NOT be features:
- Simple UI components without logic (use shared/ui)
- Data models only (use entities)
- Utility functions (use shared/lib)
- Complex widgets combining multiple features

Remember: Features should provide clear user value and be reusable across different parts of the application.