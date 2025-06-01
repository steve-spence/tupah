// Blog Page
// Add some display page for the home page for blogs like these are all my blogs!

'use client'

import Link from 'next/link'
import React from 'react'
import { Header } from '@/components/Header/Header'
import { NavIcon, NavIconProps } from '@/components/NavIcon/NavIcon'

// testing packages
import Dropdown from 'react-bootstrap/Dropdown'


export default function BlogPage() {
    /* Link to slug? */
    enum searchBarWords {
        "Search",
        "Explore",
        "Enjoy",
    };

    return (
        <div>

            {/* Header */}
            <section>
                <Header data={{ title: "Blogs", subtext: "I be bloggin'" }} />
            </section>

            {/* Trending Section */}
            <div className="flex flex-col justify-center p-10 gap-5 bg-[#ffffff]">
                <h2 className="text-[#9379cc] text-3xl font-bold font-">Trending</h2>
                <div className="flex flex-row justify-center items-center gap-3">
                    <NavIcon data={{ id: "trending1", title: "1", bg_path: "/blog_icon.svg", link: "/" }}></NavIcon>
                    <NavIcon data={{ id: "trending2", title: "2", bg_path: "/blog_icon.svg", link: "/" }}></NavIcon>
                    <NavIcon data={{ id: "trending3", title: "3", bg_path: "/blog_icon.svg", link: "/" }}></NavIcon>
                    <NavIcon data={{ id: "trending4", title: "4", bg_path: "/blog_icon.svg", link: "/" }}></NavIcon>
                </div>

                {/* Search Bar */}
                <div className=" flex bg-[#9379cc] rounded-4xl m-10">
                    <input className=" w-full h-full" id="searchbar" type="text"></input>
                </div>
            </div>

            {/* Filtered Section */}
            <div className="flex flex-col items-center justify-center bg-[#212121]">
                {/* Filter part */}
                <div className="flex flex-row gap-5 w-fit bg-[#9379cc] items-center justify-center">
                    <h4>Filter</h4>
                    <Dropdown className="m-2">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Random Rotation */}
                <div>

                </div>

            </div>


            <div>

            </div>

            {/* Lets make an auto scroller that is good */}
            {/* 
            The header will stick and the text in the middle will turn into a slider for 
            reading speed the text will be long and down th emiddle. After text takes up 
            4 lines then make a new paragraph
             */}
        </div>
    )

}