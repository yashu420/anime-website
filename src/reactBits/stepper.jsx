import React, { useState, Children, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
  import { useNavigate } from "react-router-dom";
export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
    const navigate = useNavigate();
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isLastStep = currentStep === totalSteps;
  const isCompleted = currentStep > totalSteps;

  const updateStep = (step) => {
    setCurrentStep(step);
    if (step > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(step);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    } else {
      updateStep(totalSteps + 1);
      navigate("/");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]">

      {/* Glass Card */}
      <div className="w-full max-w-xl rounded-3xl bg-white/5 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.25)] overflow-hidden">

        {/* Step Indicators */}
        <div className="flex items-center p-6">
          {stepsArray.map((_, index) => {
            const step = index + 1;
            const isActive = currentStep === step;
            const isComplete = currentStep > step;

            return (
              <React.Fragment key={step}>
                <div
                  onClick={() => updateStep(step)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold cursor-pointer transition
                  ${
                    isActive
                      ? "bg-purple-600 text-white scale-110 shadow-lg"
                      : isComplete
                      ? "bg-purple-500 text-white"
                      : "bg-[#020617] text-gray-400 border border-purple-500/40"
                  }`}
                >
                  {isComplete ? "✓" : step}
                </div>

                {index < stepsArray.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 bg-purple-500/20">
                    <div
                      className={`h-full ${
                        currentStep > step ? "bg-purple-500 w-full" : "w-0"
                      } transition-all`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <StepContentWrapper currentStep={currentStep} direction={direction}>
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* Footer */}
        {!isCompleted && (
          <div className="flex justify-between p-6">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              className="ml-auto flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 shadow-[0_0_15px_rgba(139,92,246,0.6)]
               hover:scale-105 transition cursor-pointer"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Content Animation */
function StepContentWrapper({ currentStep, direction, children }) {
  const [height, setHeight] = useState(0);

  return (
    <motion.div animate={{ height }} className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <Slide key={currentStep} direction={direction} onHeight={setHeight}>
          {children}
        </Slide>
      </AnimatePresence>
    </motion.div>
  );
}

function Slide({ children, direction, onHeight }) {
  const ref = useRef();

  useLayoutEffect(() => {
    if (ref.current) {
      onHeight(ref.current.offsetHeight);
    }
  }, [children]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: direction >= 0 ? 100 : -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction >= 0 ? -50 : 50, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute w-full p-6 text-center text-white"
    >
      {children}
    </motion.div>
  );
}

/* Step Wrapper */
export function Step({ children }) {
  return <div>{children}</div>;
}