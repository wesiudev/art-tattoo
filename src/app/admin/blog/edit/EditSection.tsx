"use client";
import { Post, Section } from "@/types";
import { Editor } from "react-draft-wysiwyg";
import { FaArrowRight } from "react-icons/fa";

export default function EditSection({
  selectedSection,
  setSelectedSection,
  selectedPost,
  setSelectedPost,
  setSectionEditorOpen,
  sectionEditorOpen,
}: {
  selectedSection: Section;
  setSelectedSection: Function;
  selectedPost: Post;
  setSelectedPost: Function;
  setSectionEditorOpen: Function;
  sectionEditorOpen: boolean;
}) {
  const updateSelectedPost = () => {
    if (selectedSection) {
      const updatedSections = selectedPost.sections.map((section, i) =>
        i === selectedSection.id
          ? {
              ...section,
              title: selectedSection.title,
              content: selectedSection.content,
            }
          : section
      );
      setSelectedPost({ ...selectedPost, sections: updatedSections });
    }
  };

  return (
    <div
      className={`h-screen w-[80vw] z-[1000] fixed right-0 top-0 bg-[#222430]  text-white  ease-in-out ${
        sectionEditorOpen ? "translate-x-[0%]" : "translate-x-[120%]"
      }`}
    >
      <div className="flex flex-col w-full relative">
        <button
          onClick={() => {
            setSectionEditorOpen(false);
          }}
          className="absolute left-0 -translate-x-[100%] w-max p-3 top-3 flex flex-row items-center bg-red-400 hover:bg-red-600 duration-200"
        >
          Zamknij
          <FaArrowRight className="ml-3" />
        </button>
        <div className="myEditor text-black p-3 rounded-xl bg-[#222430]">
          <h1 className="text-white text-2xl mb-2">Edytuj sekcję</h1>
          <p className="text-white text-lg mt-6 mb-2">Tytuł:</p>
          <input
            placeholder="Wpisz tytuł..."
            className="!text-black  bg-slate-400 mt-1 p-2 outline-none placeholder:text-gray-500"
            type="text"
            value={selectedSection?.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedSection({ ...selectedSection, title: e.target.value })
            }
          />
          <p className="text-white text-lg mb-2">Treść:</p>
          <Editor
            editorStyle={{
              backgroundColor: "rgb(148 163 184)",
              color: "black",
              height: "300px",
              padding: "3px 15px",
            }}
            editorState={selectedSection?.content}
            onEditorStateChange={(newEditorState) => {
              setSelectedSection({
                ...selectedSection,
                content: newEditorState,
              });
            }}
          />
          <button
            className="bg-transparent hover:bg-green-700 duration-500 ease-in-out p-6 w-full mt-6"
            onClick={() => updateSelectedPost()}
          >
            Zatwierdź sekcję
          </button>
        </div>
      </div>
    </div>
  );
}
