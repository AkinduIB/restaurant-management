import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useStaff = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isStaff, isLoading: isStaffLoading } = useQuery({
        queryKey: [user?.email, 'isStaff'],
        queryFn: async () => {
            if (!user?.email) return false; // Handle case where email is undefined
            const res = await axiosSecure.get(`users/staff/${user.email}`);
            // console.log(res.data);
            return res.data?.staff;
        },
        enabled: !!user?.email, // Only run query if user email is available
    });

    return [isStaff, isStaffLoading];
};

export default useStaff;
