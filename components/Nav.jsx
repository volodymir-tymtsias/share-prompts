"use client";

import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import React, { useEffect, useState } from 'react'

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, []);

  const signOutAndCloseDropdawn = () => {
    signOut();
    setDropdownIsOpen(false);
  };

  const toggleDropdawnIsOpen = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg"
          alt="Share-Prompts logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Share-Prompts</p>
      </Link>

      {/* Desctop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button 
              type="button"
              className="outline_btn"
              onClick={signOut}
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image 
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
                type="button"
                key={provider.name}
                className="black_btn"
                onClick={() => signIn(provider.id)}
              >
                {`SignIn with ${provider.name}`}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={toggleDropdawnIsOpen}
            />

            {dropdownIsOpen && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_item"
                  onClick={toggleDropdawnIsOpen}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_item"
                  onClick={toggleDropdawnIsOpen}
                >
                  Create Prompt
                </Link>

                <button 
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={signOutAndCloseDropdawn}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
                type="button"
                key={provider.name}
                className="black_btn"
                onClick={() => signIn(provider.id)}
              >
                {`SignIn with ${provider.name}`}
              </button>
            ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav;