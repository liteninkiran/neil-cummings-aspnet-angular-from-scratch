using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>().ForMember(
            dest => dest.PhotoUrl,
            optn => optn.MapFrom(
                src => src.Photos.FirstOrDefault(
                    photo => photo.IsMain
                ).Url
            )
        );
        CreateMap<Photo, PhotoDto>();
    }
}
