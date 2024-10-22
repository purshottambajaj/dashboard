import React, { useState } from 'react';

const WidgetTypes = [
  { id: 1, type: 'Text', defaultContent: 'Widget 1', backgroundColor: '#ffffff' },
  { id: 2, type: 'Progress', defaultContent: '50', backgroundColor: '#ffffff' },
  { id: 3, type: 'TimePicker', defaultContent: '12:00', backgroundColor: '#ffffff' },
  { id: 4, type: 'Slider', defaultContent: '50', backgroundColor: '#ffffff' },
];

const Widgets = () => {
  const [widgets, setWidgets] = useState(
    WidgetTypes.map(widget => ({
      ...widget,
      content: widget.defaultContent,
    }))
  );

  const handleContentChange = (id, newContent) => {
    setWidgets(widgets.map(widget =>
      widget.id === id ? { ...widget, content: newContent } : widget
    ));
  };

  const handleColorChange = (id, newColor) => {
    setWidgets(widgets.map(widget =>
      widget.id === id ? { ...widget, backgroundColor: newColor } : widget
    ));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map(widget => (
        <div
          key={widget.id}
          className="p-6 shadow rounded-md"
          style={{ backgroundColor: widget.backgroundColor }}
        >
          {widget.type === 'Text' && (
            <input
              type="text"
              value={widget.content}
              onChange={(e) => handleContentChange(widget.id, e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Enter text"
            />
          )}
          
          {widget.type === 'Progress' && (
            <div className="mb-2">
              <input
                type="number"
                value={widget.content}
                onChange={(e) => handleContentChange(widget.id, e.target.value)}
                className="border p-2 mb-2 w-full"
                min="0"
                max="100"
              />
              <div className="bg-gray-300 h-4 rounded">
                <div
                  className="bg-blue-600 h-full rounded"
                  style={{ width: `${Math.min(Math.max(widget.content, 0), 100)}%` }}
                />
              </div>
            </div>
          )}
          {widget.type === 'TimePicker' && (
            <input
              type="time"
              value={widget.content}
              onChange={(e) => handleContentChange(widget.id, e.target.value)}
              className="border p-2 mb-2 w-full"
            />
          )}
          {widget.type === 'Slider' && (
            <div className="mb-2">
              <input
                type="range"
                value={widget.content}
                min="0"
                max="100"
                onChange={(e) => handleContentChange(widget.id, e.target.value)}
                className="w-full"
              />
              <div className="text-center">{widget.content}</div>
            </div>
          )}
          <input
            type="color"
            value={widget.backgroundColor}
            onChange={(e) => handleColorChange(widget.id, e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default Widgets;
