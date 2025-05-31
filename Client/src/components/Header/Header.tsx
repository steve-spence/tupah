import React from 'react'

export default function Header({ data, }: Props) {

}

interface HeaderProps {
    title: string,
    subtext: string,
};

type Props = {
    data?: HeaderProps,
};