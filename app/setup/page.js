'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { INDUSTRIES, CAPABILITY_BLOCKS } from '@/lib/capabilities';

// Color theme
const COLORS = {
  primary: '#6C3AED',
  primaryLight: '#8B5CF6',
  accent: '#10B981',
  dark: '#0F172A',
  darkMid: '#1E293B',
};

export default function SetupWizard() {
  const router = useRouter();

  // State Management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [activeCapabilities, setActiveCapabilities] = useState([]);
  const [blockConfigs, setBlockConfigs] = useState({});
  const [voiceSettings, setVoiceSettings] = useState({
    name: '',
    greeting: '',
    style: 'friendly',
    language: 'English',
  });
  const [testCallOpen, setTestCallOpen] = useState(false);
  const [launchLoading, setLaunchLoading] = useState(false);
  const [launchSuccess, setLaunchSuccess] = useState(false);

  // Drag and drop state
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);

  // Get available capabilities for selected industry
  const getAvailableCapabilities = () => {
    if (!selectedIndustry) return [];

    const industry = INDUSTRIES.find((ind) => ind.id === selectedIndustry);
    if (!industry) return [];

    return industry.recommendedBlocks.map((blockId) => CAPABILITY_BLOCKS[blockId]).filter(Boolean);
  };

  // Get all capabilities not in active list
  const getUnusedCapabilities = () => {
    const available = getAvailableCapabilities();
    return available.filter((cap) => !activeCapabilities.includes(cap.id));
  };

  // Initialize active capabilities on industry selection
  useEffect(() => {
    if (selectedIndustry) {
      const industry = INDUSTRIES.find((ind) => ind.id === selectedIndustry);
      setActiveCapabilities(industry?.recommendedBlocks || []);
      setBlockConfigs({});
      setVoiceSettings({
        name: `${industry?.name} Assistant` || 'AI Assistant',
        greeting: `Hey there! Thanks for calling ${industry?.name}, how can I help you today?`,
        style: 'friendly',
        language: 'English',
      });
    }
  }, [selectedIndustry]);

  // Handle drag events
  const handleDragStart = (e, blockId) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropZoneActive(true);
  };

  const handleDragLeave = () => {
    setDropZoneActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);

    if (draggedBlock && !activeCapabilities.includes(draggedBlock)) {
      setActiveCapabilities([...activeCapabilities, draggedBlock]);
    }
    setDraggedBlock(null);
  };

  // Add capability (for mobile/touch)
  const addCapability = (blockId) => {
    if (!activeCapabilities.includes(blockId)) {
      setActiveCapabilities([...activeCapabilities, blockId]);
    }
  };

  // Remove capability
  const removeCapability = (blockId) => {
    setActiveCapabilities(activeCapabilities.filter((id) => id !== blockId));
    const newConfigs = { ...blockConfigs };
    delete newConfigs[blockId];
    setBlockConfigs(newConfigs);
  };

  // Update block config
  const updateBlockConfig = (blockId, fieldKey, value) => {
    setBlockConfigs((prev) => ({
      ...prev,
      [blockId]: {
        ...(prev[blockId] || {}),
        [fieldKey]: value,
      },
    }));
  };

  // Check if block has any filled config
  const isBlockConfigured = (blockId) => {
    const config = blockConfigs[blockId];
    if (!config) return false;
    return Object.values(config).some((val) => val && val !== '');
  };

  // Navigation
  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Launch agent
  const handleLaunch = async () => {
    setLaunchLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLaunchLoading(false);
    setLaunchSuccess(true);
  };

  // Validation
  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return selectedIndustry !== null;
      case 2:
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  const industry = selectedIndustry ? INDUSTRIES.find((ind) => ind.id === selectedIndustry) : null;

  return (
    <div className="min-h-screen overflow-hidden" style={{ backgroundColor: COLORS.dark }}>
      {/* Progress Bar */}
      {!launchSuccess && <ProgressBar currentStep={currentStep} />}

      {/* Main Content */}
      <div
        className="pt-32 pb-20 px-4 md:px-8"
        style={{
          minHeight: '100vh',
          backgroundColor: COLORS.dark,
        }}
      >
        <div className="max-w-6xl mx-auto">
          {!launchSuccess ? (
            <div className="fade-in">
              {currentStep === 1 && (
                <Step1IndustrySelection
                  selectedIndustry={selectedIndustry}
                  setSelectedIndustry={setSelectedIndustry}
                />
              )}

              {currentStep === 2 && (
                <Step2BuildAgent
                  selectedIndustry={selectedIndustry}
                  activeCapabilities={activeCapabilities}
                  getUnusedCapabilities={getUnusedCapabilities}
                  getAvailableCapabilities={getAvailableCapabilities}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDrop={handleDrop}
                  addCapability={addCapability}
                  removeCapability={removeCapability}
                  draggedBlock={draggedBlock}
                  dropZoneActive={dropZoneActive}
                />
              )}

              {currentStep === 3 && (
                <Step3Configure
                  activeCapabilities={activeCapabilities}
                  blockConfigs={blockConfigs}
                  updateBlockConfig={updateBlockConfig}
                  isBlockConfigured={isBlockConfigured}
                />
              )}

              {currentStep === 4 && (
                <Step4Voice
                  voiceSettings={voiceSettings}
                  setVoiceSettings={setVoiceSettings}
                  industry={industry}
                />
              )}

              {currentStep === 5 && (
                <Step5Review
                  selectedIndustry={selectedIndustry}
                  activeCapabilities={activeCapabilities}
                  voiceSettings={voiceSettings}
                  blockConfigs={blockConfigs}
                  launchLoading={launchLoading}
                  setTestCallOpen={setTestCallOpen}
                  testCallOpen={testCallOpen}
                  handleLaunch={handleLaunch}
                  industry={industry}
                />
              )}

              {/* Navigation Buttons */}
              <div className="mt-12 flex justify-between items-center max-w-2xl mx-auto">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 border rounded-lg transition-all duration-200"
                    style={{
                      borderColor: COLORS.primaryLight,
                      color: COLORS.primaryLight,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Back
                  </button>
                )}

                <div className="flex-1" />

                {currentStep < 5 && (
                  <button
                    onClick={handleNext}
                    disabled={!canContinue()}
                    className={`px-8 py-2 rounded-lg transition-all duration-200 font-medium ${
                      !canContinue() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{
                      background: canContinue()
                        ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`
                        : 'gray',
                      color: 'white',
                    }}
                  >
                    Continue
                  </button>
                )}

                {currentStep === 5 && (
                  <button
                    onClick={handleLaunch}
                    disabled={launchLoading}
                    className={`px-8 py-3 rounded-lg transition-all duration-200 font-bold text-lg ${
                      launchLoading ? 'opacity-75' : ''
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                      color: 'white',
                    }}
                  >
                    {launchLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Launching...
                      </span>
                    ) : (
                      'Launch Your AI Agent'
                    )}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <SuccessScreen router={router} />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh);
          }
        }

        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: float-up 3s ease-in-out forwards;
          pointer-events: none;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ currentStep }) {
  const steps = [
    { number: 1, label: 'Industry' },
    { number: 2, label: 'Capabilities' },
    { number: 3, label: 'Configure' },
    { number: 4, label: 'Voice' },
    { number: 5, label: 'Launch' },
  ];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 border-b"
      style={{
        backgroundColor: COLORS.dark,
        borderColor: COLORS.darkMid,
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center gap-2 md:gap-4">
              {/* Step Circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300"
                style={{
                  backgroundColor:
                    currentStep >= step.number
                      ? COLORS.primary
                      : COLORS.darkMid,
                  color: 'white',
                  boxShadow:
                    currentStep >= step.number
                      ? `0 0 20px rgba(108, 58, 237, 0.3)`
                      : 'none',
                }}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>

              {/* Step Label (hidden on small screens) */}
              <div className="hidden md:block text-xs font-medium" style={{ color: COLORS.primaryLight, minWidth: '70px' }}>
                {step.label}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-1 md:mx-2 transition-all duration-300"
                  style={{
                    backgroundColor:
                      currentStep > step.number ? COLORS.primary : COLORS.darkMid,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 1: Choose Your Industry
function Step1IndustrySelection({ selectedIndustry, setSelectedIndustry }) {
  return (
    <div className="fade-in">
      <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'white' }}>
        Choose Your Industry
      </h2>
      <p className="mb-8" style={{ color: '#94a3b8' }}>
        Select the type of business you operate. We'll tailor your AI agent to fit your needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INDUSTRIES.map((industry) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            isSelected={selectedIndustry === industry.id}
            onSelect={() => setSelectedIndustry(industry.id)}
          />
        ))}
      </div>
    </div>
  );
}

function IndustryCard({ industry, isSelected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="p-6 rounded-xl transition-all duration-300 text-left relative overflow-hidden border-2"
      style={{
        backgroundColor: COLORS.darkMid,
        borderColor: isSelected ? industry.color : COLORS.darkMid,
        boxShadow: isSelected
          ? `0 0 30px rgba(${parseInt(industry.color.slice(1, 3), 16)}, ${parseInt(industry.color.slice(3, 5), 16)}, ${parseInt(industry.color.slice(5, 7), 16)}, 0.3)`
          : 'none',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = industry.color;
          e.currentTarget.style.transform = 'scale(1.02)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = COLORS.darkMid;
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      {/* Left Border Accent */}
      {isSelected && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: industry.color }}
        />
      )}

      <div className="flex items-start gap-4">
        <div className="text-4xl">{industry.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1" style={{ color: 'white' }}>
            {industry.name}
          </h3>
          <p className="text-sm" style={{ color: '#cbd5e1' }}>
            {industry.description}
          </p>
        </div>
        {isSelected && (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: industry.color, color: 'white' }}
          >
            ✓
          </div>
        )}
      </div>
    </button>
  );
}

// Step 2: Build Your Agent (Drag & Drop)
function Step2BuildAgent({
  selectedIndustry,
  activeCapabilities,
  getUnusedCapabilities,
  getAvailableCapabilities,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  addCapability,
  removeCapability,
  draggedBlock,
  dropZoneActive,
}) {
  const industry = INDUSTRIES.find((ind) => ind.id === selectedIndustry);
  const availableCapabilities = getAvailableCapabilities();
  const unusedCapabilities = getUnusedCapabilities();

  return (
    <div className="fade-in">
      <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'white' }}>
        Build Your Agent
      </h2>
      <p className="mb-8" style={{ color: '#94a3b8' }}>
        Drag and drop capabilities to customize your AI agent. We've pre-selected recommended features
        for your industry.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Available Capabilities */}
        <div>
          <h3 className="font-bold mb-4" style={{ color: COLORS.primaryLight }}>
            Available Capabilities
          </h3>
          <div
            className="rounded-lg border p-4 overflow-y-auto"
            style={{
              backgroundColor: COLORS.darkMid,
              borderColor: COLORS.darkMid,
              maxHeight: '600px',
            }}
          >
            <div className="space-y-3">
              {availableCapabilities.length === 0 ? (
                <p style={{ color: '#cbd5e1' }}>No capabilities available for this industry.</p>
              ) : (
                availableCapabilities.map((block) => {
                  const isActive = activeCapabilities.includes(block.id);
                  return (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, block.id)}
                      className={`p-3 rounded-lg border-2 cursor-grab transition-all duration-200 ${
                        isActive ? 'opacity-50' : ''
                      }`}
                      style={{
                        backgroundColor: isActive ? COLORS.dark : COLORS.dark,
                        borderColor: isActive ? COLORS.darkMid : COLORS.darkMid,
                        opacity: isActive ? 0.5 : 1,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-xl flex-shrink-0">{block.icon}</span>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm" style={{ color: 'white' }}>
                              {block.name}
                            </h4>
                            <p className="text-xs mb-2" style={{ color: '#cbd5e1' }}>
                              {block.description}
                            </p>
                            <span
                              className="text-xs px-2 py-1 rounded inline-block"
                              style={{
                                backgroundColor: COLORS.darkMid,
                                color: COLORS.primaryLight,
                              }}
                            >
                              {block.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          {isActive && (
                            <span className="text-xs font-bold px-2 py-1 rounded" style={{ color: COLORS.accent, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                              Added
                            </span>
                          )}

                          {/* Mobile: Add Button */}
                          {!isActive && (
                            <button
                              onClick={() => addCapability(block.id)}
                              className="lg:hidden px-3 py-1 rounded text-sm font-bold transition-all duration-200"
                              style={{
                                backgroundColor: COLORS.primary,
                                color: 'white',
                              }}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Active Capabilities */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold" style={{ color: COLORS.primaryLight }}>
              Your Agent's Capabilities
            </h3>
            <span className="text-sm" style={{ color: '#94a3b8' }}>
              {activeCapabilities.length} of {availableCapabilities.length} active
            </span>
          </div>

          <div
            className="rounded-lg border-2 p-4 min-h-96"
            style={{
              backgroundColor: COLORS.darkMid,
              borderColor: dropZoneActive ? COLORS.primary : COLORS.darkMid,
              borderStyle: activeCapabilities.length === 0 ? 'dashed' : 'solid',
              transition: 'all 0.3s ease',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {activeCapabilities.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <p style={{ color: '#64748b' }}>
                  {dropZoneActive
                    ? 'Drop capabilities here'
                    : 'Drag capabilities here or use the + button on mobile'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {activeCapabilities.map((blockId) => {
                  const block = CAPABILITY_BLOCKS[blockId];
                  if (!block) return null;

                  return (
                    <div
                      key={blockId}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg slide-in transition-all duration-200"
                      style={{
                        backgroundColor: COLORS.dark,
                        borderLeft: `3px solid ${COLORS.primary}`,
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-lg flex-shrink-0">{block.icon}</span>
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm" style={{ color: 'white' }}>
                            {block.name}
                          </h4>
                        </div>
                      </div>

                      <button
                        onClick={() => removeCapability(blockId)}
                        className="text-lg hover:scale-110 transition-transform"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 3: Configure Your Capabilities
function Step3Configure({ activeCapabilities, blockConfigs, updateBlockConfig, isBlockConfigured }) {
  const [expandedBlocks, setExpandedBlocks] = useState({});

  const toggleExpand = (blockId) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [blockId]: !prev[blockId],
    }));
  };

  return (
    <div className="fade-in">
      <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'white' }}>
        Configure Your Capabilities
      </h2>
      <p className="mb-8" style={{ color: '#94a3b8' }}>
        Customize each capability with your specific details. You can configure these later if needed.
      </p>

      <div className="space-y-4 max-w-3xl">
        {activeCapabilities.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No capabilities to configure.</p>
        ) : (
          activeCapabilities.map((blockId) => {
            const block = CAPABILITY_BLOCKS[blockId];
            if (!block) return null;

            const isExpanded = expandedBlocks[blockId];
            const isConfigured = isBlockConfigured(blockId);

            return (
              <div key={blockId} className="overflow-hidden rounded-lg border" style={{ borderColor: COLORS.darkMid }}>
                {/* Accordion Header */}
                <button
                  onClick={() => toggleExpand(blockId)}
                  className="w-full flex items-center justify-between p-4 transition-all duration-200"
                  style={{
                    backgroundColor: COLORS.darkMid,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(108, 58, 237, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.darkMid;
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{block.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold" style={{ color: 'white' }}>
                        {block.name}
                      </h3>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>
                        {block.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isConfigured && (
                      <span style={{ color: COLORS.accent, fontSize: '1.2rem' }}>✓</span>
                    )}
                    <span
                      style={{
                        color: COLORS.primaryLight,
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease',
                        fontSize: '1.2rem',
                      }}
                    >
                      ▼
                    </span>
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-4 border-t space-y-4" style={{ borderColor: COLORS.darkMid, backgroundColor: COLORS.dark }}>
                    {block.configFields && block.configFields.length > 0 ? (
                      block.configFields.map((field) => (
                        <ConfigField
                          key={field.key}
                          field={field}
                          value={blockConfigs[blockId]?.[field.key] || ''}
                          onChange={(val) => updateBlockConfig(blockId, field.key, val)}
                        />
                      ))
                    ) : (
                      <p style={{ color: '#94a3b8' }}>No configuration needed for this capability.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: `3px solid ${COLORS.accent}` }}>
        <p className="text-sm" style={{ color: COLORS.accent }}>
          💡 You can skip configuration now and set these up later in your dashboard.
        </p>
      </div>
    </div>
  );
}

// Config Field Component
function ConfigField({ field, value, onChange }) {
  if (field.type === 'text') {
    return (
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'white' }}>
          {field.label}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: COLORS.dark,
            borderColor: COLORS.darkMid,
            color: 'white',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = COLORS.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = COLORS.darkMid;
          }}
        />
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'white' }}>
          {field.label}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows="4"
          className="w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none resize-none"
          style={{
            backgroundColor: COLORS.dark,
            borderColor: COLORS.darkMid,
            color: 'white',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = COLORS.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = COLORS.darkMid;
          }}
        />
      </div>
    );
  }

  if (field.type === 'number') {
    return (
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'white' }}>
          {field.label}
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: COLORS.dark,
            borderColor: COLORS.darkMid,
            color: 'white',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = COLORS.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = COLORS.darkMid;
          }}
        />
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'white' }}>
          {field.label}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: COLORS.dark,
            borderColor: COLORS.darkMid,
            color: 'white',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = COLORS.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = COLORS.darkMid;
          }}
        >
          <option value="">Select an option</option>
          {field.options &&
            field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
        </select>
      </div>
    );
  }

  if (field.type === 'toggle') {
    return (
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold" style={{ color: 'white' }}>
          {field.label}
        </label>
        <button
          onClick={() => onChange(value ? '' : 'true')}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200"
          style={{
            backgroundColor: value ? COLORS.primary : COLORS.darkMid,
          }}
        >
          <span
            className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
            style={{
              transform: value ? 'translateX(22px)' : 'translateX(2px)',
            }}
          />
        </button>
      </div>
    );
  }

  if (field.type === 'time') {
    return (
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'white' }}>
          {field.label}
        </label>
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: COLORS.dark,
            borderColor: COLORS.darkMid,
            color: 'white',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = COLORS.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = COLORS.darkMid;
          }}
        />
      </div>
    );
  }

  return null;
}

// Step 4: Voice & Personality
function Step4Voice({ voiceSettings, setVoiceSettings, industry }) {
  const voiceStyles = [
    {
      id: 'friendly',
      name: 'Friendly & Warm',
      emoji: '😊',
      description: 'Conversational, welcoming, and approachable',
    },
    {
      id: 'professional',
      name: 'Professional & Polished',
      emoji: '💼',
      description: 'Formal, competent, and business-like',
    },
    {
      id: 'casual',
      name: 'Casual & Relaxed',
      emoji: '😎',
      description: 'Laid-back, fun, and easy-going',
    },
  ];

  const languages = ['English', 'French', 'Spanish'];

  return (
    <div className="fade-in max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'white' }}>
        Voice & Personality
      </h2>
      <p className="mb-8" style={{ color: '#94a3b8' }}>
        Define how your AI agent communicates with customers.
      </p>

      {/* Agent Name */}
      <div className="mb-8">
        <label className="block text-sm font-bold mb-3" style={{ color: 'white' }}>
          Agent Name
        </label>
        <input
          type="text"
          value={voiceSettings.name}
          onChange={(e) => setVoiceSettings({ ...voiceSettings, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none text-lg"
          style={{
            backgroundColor: COLORS.darkMid,
            borderColor: COLORS.darkMid,
            color: 'white',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = COLORS.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = COLORS.darkMid;
          }}
        />
      </div>

      {/* Greeting Message */}
      <div className="mb-8">
        <label className="block text-sm font-bold mb-3" style={{ color: 'white' }}>
          Greeting Message
        </label>
        <textarea
          value={voiceSettings.greeting}
          onChange={(e) => setVoiceSettings({ ...voiceSettings, greeting: e.target.value })}
          rows="3"
          className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none resize-none"
          style={{
            backgroundColor: COLORS.darkMid,
            borderColor: COLORS.darkMid,
            color: 'white',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = COLORS.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = COLORS.darkMid;
          }}
        />
      </div>

      {/* Voice Style Selection */}
      <div className="mb-8">
        <label className="block text-sm font-bold mb-4" style={{ color: 'white' }}>
          Voice Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {voiceStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setVoiceSettings({ ...voiceSettings, style: style.id })}
              className="p-4 rounded-lg border-2 transition-all duration-200 text-left"
              style={{
                backgroundColor: COLORS.darkMid,
                borderColor: voiceSettings.style === style.id ? COLORS.primary : COLORS.darkMid,
                boxShadow: voiceSettings.style === style.id ? `0 0 20px rgba(108, 58, 237, 0.3)` : 'none',
              }}
              onMouseEnter={(e) => {
                if (voiceSettings.style !== style.id) {
                  e.currentTarget.style.borderColor = COLORS.primaryLight;
                }
              }}
              onMouseLeave={(e) => {
                if (voiceSettings.style !== style.id) {
                  e.currentTarget.style.borderColor = COLORS.darkMid;
                }
              }}
            >
              <div className="text-2xl mb-2">{style.emoji}</div>
              <h4 className="font-bold mb-1" style={{ color: 'white' }}>
                {style.name}
              </h4>
              <p className="text-xs" style={{ color: '#94a3b8' }}>
                {style.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div className="mb-8">
        <label className="block text-sm font-bold mb-3" style={{ color: 'white' }}>
          Language
        </label>
        <select
          value={voiceSettings.language}
          onChange={(e) => setVoiceSettings({ ...voiceSettings, language: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: COLORS.darkMid,
            borderColor: COLORS.darkMid,
            color: 'white',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = COLORS.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = COLORS.darkMid;
          }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Preview Section */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: COLORS.darkMid,
          borderColor: COLORS.darkMid,
        }}
      >
        <h3 className="font-bold mb-4" style={{ color: COLORS.primaryLight }}>
          Call Preview
        </h3>
        <div
          className="p-4 rounded-lg space-y-3"
          style={{
            backgroundColor: COLORS.dark,
          }}
        >
          <div className="flex gap-3">
            <span style={{ color: COLORS.primary }}>📞</span>
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: 'white' }}>
                {voiceSettings.name}
              </p>
              <p className="text-sm" style={{ color: '#cbd5e1' }}>
                {voiceSettings.greeting}
              </p>
            </div>
          </div>
          <div className="flex gap-3 pt-3 border-t" style={{ borderColor: COLORS.darkMid }}>
            <span>👤</span>
            <div className="flex-1">
              <p className="text-sm" style={{ color: '#cbd5e1' }}>
                "Hi, I'd like to book an appointment."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 5: Review & Launch
function Step5Review({
  selectedIndustry,
  activeCapabilities,
  voiceSettings,
  blockConfigs,
  launchLoading,
  setTestCallOpen,
  testCallOpen,
  handleLaunch,
  industry,
}) {
  return (
    <div className="fade-in max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'white' }}>
        Review & Launch
      </h2>
      <p className="mb-8" style={{ color: '#94a3b8' }}>
        Here's everything you configured. Ready to launch your AI agent?
      </p>

      {/* Summary Cards */}
      <div className="space-y-6">
        {/* Industry Summary */}
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: COLORS.darkMid,
            borderColor: COLORS.darkMid,
          }}
        >
          <h3 className="font-bold mb-4" style={{ color: COLORS.primaryLight }}>
            Industry
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{industry?.icon}</span>
            <div>
              <p className="font-bold" style={{ color: 'white' }}>
                {industry?.name}
              </p>
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                {industry?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Capabilities Summary */}
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: COLORS.darkMid,
            borderColor: COLORS.darkMid,
          }}
        >
          <h3 className="font-bold mb-4" style={{ color: COLORS.primaryLight }}>
            Active Capabilities ({activeCapabilities.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeCapabilities.map((blockId) => {
              const block = CAPABILITY_BLOCKS[blockId];
              if (!block) return null;

              return (
                <div
                  key={blockId}
                  className="flex items-center gap-2 p-2 rounded"
                  style={{
                    backgroundColor: COLORS.dark,
                  }}
                >
                  <span>{block.icon}</span>
                  <span style={{ color: 'white' }} className="text-sm">
                    {block.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Voice Settings Summary */}
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: COLORS.darkMid,
            borderColor: COLORS.darkMid,
          }}
        >
          <h3 className="font-bold mb-4" style={{ color: COLORS.primaryLight }}>
            Voice Settings
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold mb-1" style={{ color: '#94a3b8' }}>
                AGENT NAME
              </p>
              <p style={{ color: 'white' }}>{voiceSettings.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold mb-1" style={{ color: '#94a3b8' }}>
                GREETING
              </p>
              <p style={{ color: '#cbd5e1' }} className="text-sm">
                {voiceSettings.greeting}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: '#94a3b8' }}>
                  VOICE STYLE
                </p>
                <p style={{ color: 'white' }} className="capitalize">
                  {voiceSettings.style.replace('-', ' ')}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: '#94a3b8' }}>
                  LANGUAGE
                </p>
                <p style={{ color: 'white' }}>{voiceSettings.language}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Call Button */}
      <div className="mt-8">
        <button
          onClick={() => setTestCallOpen(true)}
          className="w-full py-3 rounded-lg transition-all duration-200 font-bold"
          style={{
            backgroundColor: COLORS.darkMid,
            color: COLORS.primary,
            border: `2px solid ${COLORS.primary}`,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(108, 58, 237, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = COLORS.darkMid;
          }}
        >
          📞 Test Call
        </button>
      </div>

      {/* Test Call Modal */}
      {testCallOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={() => setTestCallOpen(false)}
        >
          <div
            className="rounded-lg p-6 max-w-md w-full"
            style={{ backgroundColor: COLORS.darkMid }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: 'white' }}>
              Test Call Simulation
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">📞</span>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: 'white' }}>
                    {voiceSettings.name}
                  </p>
                  <p className="text-sm" style={{ color: '#cbd5e1' }}>
                    {voiceSettings.greeting}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pt-3 border-t" style={{ borderColor: COLORS.darkMid }}>
                <span>👤</span>
                <p className="text-sm" style={{ color: '#cbd5e1' }}>
                  "Hi, I'd like to book an appointment for next week."
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">{INDUSTRIES.find((i) => i.id === selectedIndustry)?.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: 'white' }}>
                    {voiceSettings.name}
                  </p>
                  <p className="text-sm" style={{ color: '#cbd5e1' }}>
                    "Of course! Let me check our availability and find you a time that works."
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setTestCallOpen(false)}
              className="w-full mt-6 py-2 rounded-lg font-bold transition-all duration-200"
              style={{
                backgroundColor: COLORS.primary,
                color: 'white',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Launch Button info */}
      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'rgba(108, 58, 237, 0.1)', borderLeft: `3px solid ${COLORS.primary}` }}>
        <p className="text-sm" style={{ color: COLORS.primaryLight }}>
          ✨ Click "Launch Your AI Agent" to go live. Your agent will be ready to take calls immediately!
        </p>
      </div>
    </div>
  );
}

// Success Screen
function SuccessScreen({ router }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Generate confetti
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: [COLORS.primary, COLORS.primaryLight, COLORS.accent][Math.floor(Math.random() * 3)],
      delay: Math.random() * 0.2,
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fade-in flex flex-col items-center justify-center min-h-screen text-center relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="confetti"
          style={{
            left: `${conf.left}%`,
            backgroundColor: conf.color,
            animationDelay: `${conf.delay}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10">
        <div className="text-6xl mb-6 animate-bounce">✓</div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'white' }}>
          Your AI Agent is Live!
        </h1>

        <p className="text-lg mb-8" style={{ color: '#94a3b8' }}>
          Your voice agent is now ready to handle calls and engage with customers.
        </p>

        {/* Mock Phone Number */}
        <div
          className="inline-block mb-12 px-6 py-4 rounded-lg"
          style={{
            backgroundColor: COLORS.darkMid,
            border: `2px solid ${COLORS.primary}`,
          }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: '#94a3b8' }}>
            YOUR AGENT PHONE NUMBER
          </p>
          <p className="text-3xl font-bold tracking-wider" style={{ color: COLORS.primary }}>
            +1 (555) 123-AGENT
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="px-8 py-3 rounded-lg transition-all duration-200 font-bold text-lg inline-block"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            color: 'white',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
