import { AppNameEnum } from 'services/models/explorer';

export const getMonacoConfig = (advanced = false): Record<any, any> => ({
  height: advanced ? '62px' : '22px',
  options: {
    lineNumbers: 'off',
    minimap: { enabled: false },
    fontFamily: 'Iosevka',
    wordWrap: advanced ? 'on' : 'off',
    fontSize: 14,
    fontWeight: 'medium',
    lineNumbersMinChars: 0,
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    lineDecorationsWidth: 0,
    hideCursorInOverviewRuler: true,
    contextmenu: false,
    glyphMargin: false,
    wordBasedSuggestions: false,
    folding: false,
    scrollBeyondLastColumn: 0,
    renderLineHighlight: 'none',
    scrollbar: { horizontal: 'hidden', vertical: 'hidden' },
    find: {
      addExtraSpaceOnTop: false,
      autoFindInSelection: 'never',
      seedSearchStringFromSelection: 'never',
    },
  },

  theme: {
    name: 'aim-theme',
    config: {
      base: 'vs',
      inherit: true,
      rules: [{ background: 'ffffff' }],
      colors: {
        'editor.foreground': '#414b6d',
        'editor.background': '#ffffff',
        'editorCursor.foreground': '#83899e',
        'dropdown.background': '#fff',
        'editorSuggestWidget.background': '#fff',
        'editorSuggestWidget.border': '#a1c7f5',
        'editorSuggestWidget.selectedBackground': '#dceafb',
        'editorSuggestWidget.selectedForeground': '#414b6d',
        'editorSuggestWidget.highlightForeground': '#1c2852',
        'editorSuggestWidget.focusHighlightForeground': '#1c2852',
        'editorSuggestWidget.foreground': '#414b6d',
        'list.hoverBackground': '#f3f8fe',
        'scrollbar.shadow': '#fff',
      },
    },
  },
});

export const getSuggestionsByExplorer = (
  explorerName: AppNameEnum,
  data: Record<any, any>,
): Record<any, any> => {
  const defaultSuggestions = {
    run: {
      hash: '',
      name: '',
      experiment: '',
      tags: '',
      archived: '',
      creation_time: '',
      end_time: '',
      ...data.params,
    },
  };
  const explorersList = {
    [AppNameEnum.RUNS]: defaultSuggestions,
    [AppNameEnum.METRICS]: defaultSuggestions,
    [AppNameEnum.PARAMS]: defaultSuggestions,
    [AppNameEnum.SCATTERS]: defaultSuggestions,
    [AppNameEnum.IMAGES]: defaultSuggestions,
  };
  return explorersList[explorerName];
};
