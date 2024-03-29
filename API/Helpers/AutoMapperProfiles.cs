﻿using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
            .ForMember(
                dest => dest.PhotoUrl,
                optn => optn.MapFrom(
                    src => src.Photos.FirstOrDefault(
                        photo => photo.IsMain
                    ).Url
                )
            )
            .ForMember(
                dest => dest.age,
                optn => optn.MapFrom(
                    src => src.DateOfBirth.CalculateAge()
                )
            );
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUser>();
        CreateMap<RegisterDto, AppUser>();
    }
}
