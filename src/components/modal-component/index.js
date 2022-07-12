import React from "react";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AiFillCloseCircle } from "react-icons/ai";

const ModalComponent = ({ title, open, setOpen, children }) => {
  return (
    <AlertDialog.Root open={open} className="z-50">
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-70 fixed bg-cover inset-0 z-50" />
        <AlertDialog.Content className="bg-white w-4/5 max-w-720 min-h-356 max-h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex flex-col  border border-modalBorder z-50 overflow-y-auto">
          <div className="w-full flex flex-col items-end  ">
            <span
              className="mt-2 mr-2 text-Purple text-20 cursor-pointer"
              onClick={() => {
                setOpen(false);
              }}
            >
              <AiFillCloseCircle size={"20px"} />
            </span>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-1 lg:p-11">
            <AlertDialog.Title className="text-20 md:text-30 text-primary font-light text-center -mt-5 mb-3">
              {title}
            </AlertDialog.Title>
            <div className="text-secondary text-12 md:text-20 text-center w-full flex justify-center">
              {children}
            </div>
          </div>
          {/* <div className="w-full flex flex-col sm:flex-row justify-center mt-2 pb-6">
            <AlertDialog.Action
              className="text-12 md:text-16 w-4/5 sm:w-auto mx-auto sm:mx-0 mb-3 sm:mb-0 sm:min-w-btn100 leading-10 font-bold uppercase tracking-widest px-3 py-1 rounded text-center bg-white text-primary shadow-box border-gray-100"
              onClick={() => {
                action();
                setOpen(false);
              }}
            >
              {acceptButton}
            </AlertDialog.Action>
            {!isDialog && (
              <AlertDialog.Cancel
                className="text-12 md:text-16 sm:ml-5 w-4/5 sm:w-auto mx-auto sm:mx-0 sm:min-w-btn100 leading-10 font-bold uppercase tracking-widest px-3 py-1 rounded text-center bg-primary text-white shadow-box border-gray-100"
                onClick={() => {
                  {
                    if (cancelAction) cancelAction();
                    setOpen(false);
                  }
                }}
              >
                {cancelButton}
              </AlertDialog.Cancel>
            )}
          </div> */}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ModalComponent;
