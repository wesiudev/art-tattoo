"use client";
import React, { useState } from "react";
import {
  CommunitySection,
  CommunityWrapper,
  JoinDescSection,
  LinkButton,
  LinkGroup,
  LinkItem,
} from "./community.styled";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import PrivacyPolicy from "./PrivacyPolicy";

const CommunityPart = () => {
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  return (
    <CommunityWrapper>
      {isPrivacyOpen && <PrivacyPolicy setOpen={setPrivacyOpen} />}
      <CommunitySection>
        <JoinDescSection>
          <h1 className="">Social Media</h1>
          <p className="text-center lg:text-left !px-3 lg:!px-0">
            Dołącz do mojej społeczności i bądź na bieżąco z aktualnościami i
            moimi działaniami. Znajdziesz mnie na Instagramie i Facebooku.
          </p>
        </JoinDescSection>
      </CommunitySection>
      <CommunitySection>
        <div className="flex flex-row flex-wrap w-full items-center justify-center lg:justify-normal space-x-3 -ml-4">
          <LinkItem
            target="_blank"
            href="https://www.instagram.com/blackbell.ce/"
            className="flex flex-row items-center hover:text-[#8f26f3] mt-3 ml-3"
          >
            <FaInstagram className="w-8 h-8 mr-3" />
            <span className="group-hover:text-[#8f26f3]">Art</span>
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://www.facebook.com/blackbell.c.e"
            className="flex flex-row items-center hover:text-[#8f26f3] mt-3"
          >
            <FaFacebook className="w-8 h-8 mr-3" />
            <span className="group-hover:text-[#8f26f3]">Art</span>
          </LinkItem>

          <LinkItem
            target="_blank"
            href="https://www.instagram.com/blackbellarttattoo/"
            className="flex flex-row items-center hover:text-[#8f26f3] mt-3"
          >
            <FaInstagram className="w-8 h-8 mr-3" />
            <span className="group-hover:text-[#8f26f3]">Tattoo</span>
          </LinkItem>
        </div>
        <LinkGroup dir="rtl" className="mt-6">
          <LinkButton onClick={() => setPrivacyOpen(true)}>
            {"polityka prywatnosci"}
          </LinkButton>
        </LinkGroup>
      </CommunitySection>
    </CommunityWrapper>
  );
};

export default CommunityPart;
