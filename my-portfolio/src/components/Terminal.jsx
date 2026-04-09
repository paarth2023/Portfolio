import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';

export function Terminal({ onExit }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'text', content: 'Welcome to Paarth\'s Project Terminal.' },
    { type: 'text', content: 'Type "help" to see available commands.' },
    { type: 'text', content: '' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = {
    help: () => [
      { type: 'text', content: 'Available commands:' },
      { type: 'text', content: '  ls           - List all projects' },
      { type: 'text', content: '  echo [id]    - Describe a specific project' },
      { type: 'text', content: '  goto-git [id]- Open project repository' },
      { type: 'text', content: '  setup        - Show environment configuration' },
      { type: 'text', content: '  take-me-home - Go back to main site' },
      { type: 'text', content: '  clear        - Clear terminal screen' }
    ],
    ls: () => [
      { type: 'text', content: 'Project List:' },
      ...projects.map(p => ({ type: 'text', content: `  ${p.id} - ${p.title}` }))
    ],
    setup: () => [
      { type: 'text', content: 'Environment Configuration:' },
      { type: 'text', content: '  OS: Fedora Linux' },
      { type: 'text', content: '  Kernel: Linux (Custom Zen)' },
      { type: 'text', content: '  Shell: Zsh / Kitty' },
      { type: 'text', content: '  Dotfiles: github.com/paarth2023/dotfiles' },
      { type: 'text', content: '  Neovim: github.com/paarth2023/neovim-config' },
      { type: 'text', content: '' },
      { type: 'text', content: 'How to explore:' },
      { type: 'text', content: "  Run 'echo dotfiles' to see my Hyprland rice previews." },
      { type: 'text', content: "  Run 'echo neovim' to view my custom Green-on-Black IDE setup." }
    ],
    echo: (args) => {
      if (!args.length) return [{ type: 'text', content: 'Usage: echo [project_id]' }];
      const id = args[0].toLowerCase();
      const project = projects.find(p => p.id === id);
      if (!project) return [{ type: 'text', content: `Project "${id}" not found. Type "ls" for a list.` }];
      
      const output = [
        { type: 'text', content: '' },
        { type: 'text', content: project.drawing }, // Using array of strings for drawing
        { type: 'text', content: '' },
        { type: 'text', content: `Title: ${project.title}` },
        { type: 'text', content: `Stack: ${project.meta}` },
        { type: 'text', content: `Description: ${project.description}` },
        { type: 'text', content: 'Core Features:' },
        ...project.points.map(pt => ({ type: 'text', content: `  - ${pt}` }))
      ];

      if (project.images && project.images.length > 0) {
        output.push({ type: 'text', content: '' });
        output.push({ type: 'text', content: 'Media Attachments:' });
        project.images.forEach(img => {
          output.push({ type: 'image', content: img });
        });
      }

      return output;
    },
    'goto-git': (args) => {
      if (!args.length) return [{ type: 'text', content: 'Usage: goto-git [project_id]' }];
      const id = args[0].toLowerCase();
      const project = projects.find(p => p.id === id);
      if (!project) return [{ type: 'text', content: `Project "${id}" not found.` }];
      window.open(project.github, '_blank');
      return [{ type: 'text', content: `Opening repository for ${project.title}...` }];
    },
    'take-me-home': () => {
      onExit();
      return [{ type: 'text', content: 'Redirecting home...' }];
    },
    clear: () => {
      return [];
    }
  };

  const handleCommand = (cmdStr) => {
    const parts = cmdStr.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const newHistory = [...history, { type: 'text', content: `paarth@portfolio:~$ ${cmdStr}` }];

    if (cmd === '') {
      setHistory(newHistory);
      return;
    }

    if (commands[cmd]) {
      const output = commands[cmd](args);
      setHistory([...newHistory, ...output, { type: 'text', content: '' }]);
    } else {
      setHistory([...newHistory, { type: 'text', content: `Command not found: ${cmd}. Type "help" for options.` }, { type: 'text', content: '' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setCommandHistory([input, ...commandHistory]);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    }
  };

  const handleAutocomplete = () => {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1];

    if (parts.length === 1) {
      const matches = Object.keys(commands).filter(c => c.startsWith(cmd));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      }
    } else if (parts.length === 2 && (cmd === 'echo' || cmd === 'goto-git')) {
      const matches = projects.filter(p => p.id.startsWith(arg)).map(p => p.id);
      if (matches.length === 1) {
        setInput(`${cmd} ${matches[0]}`);
      }
    }
  };

  return (
    <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">projects — paarth@linux</div>
      </div>
      <div className="terminal-body" ref={scrollRef}>
        {history.map((item, i) => (
          <div key={i} className="terminal-line">
            {item.type === 'image' ? (
              <div className="terminal-image-wrapper">
                <img src={item.content} alt="Project Preview" className="terminal-inline-image" />
              </div>
            ) : Array.isArray(item.content) ? (
              item.content.map((line, li) => <div key={li}>{line}</div>)
            ) : (
              item.content
            )}
          </div>
        ))}
        <div className="terminal-input-row">
          <span className="terminal-prompt">paarth@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
